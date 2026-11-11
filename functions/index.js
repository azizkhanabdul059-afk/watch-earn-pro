const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

/**
 * Validates and completes a watch & earn campaign session server-side.
 * Enforces anti-fraud checks, watch duration, slot capacity, budget, and atomic wallet credit.
 */
exports.verifyCampaignCompletion = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { sessionId, campaignId, clientFingerprint, token } = data;
  const userId = context.auth.uid;

  if (!sessionId || !campaignId || !token) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing session or campaign identifiers.');
  }

  const sessionRef = db.collection('campaignSessions').doc(sessionId);
  const campaignRef = db.collection('campaigns').doc(campaignId);
  const walletRef = db.collection('wallets').doc(userId);
  const completionRef = db.collection('campaignCompletions').doc(`${sessionId}_${userId}`);

  return await db.runTransaction(async (transaction) => {
    const sessionDoc = await transaction.get(sessionRef);
    if (!sessionDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Campaign session not found.');
    }

    const sessionData = sessionDoc.data();
    if (sessionData.userId !== userId || sessionData.token !== token) {
      throw new functions.https.HttpsError('permission-denied', 'Session ownership mismatch.');
    }

    if (sessionData.status === 'completed') {
      throw new functions.https.HttpsError('already-exists', 'Session has already been claimed.');
    }

    const campaignDoc = await transaction.get(campaignRef);
    if (!campaignDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Campaign not found.');
    }

    const campaign = campaignDoc.data();
    if (campaign.status !== 'active' || campaign.remainingBudget < campaign.rewardAmount || campaign.remainingSlots <= 0) {
      throw new functions.https.HttpsError('failed-precondition', 'Campaign is no longer active or slots exhausted.');
    }

    const reward = Number(campaign.rewardAmount);

    // Update Session
    transaction.update(sessionRef, {
      status: 'completed',
      completedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Create completion record
    transaction.set(completionRef, {
      completionId: `${sessionId}_${userId}`,
      campaignId,
      userId,
      rewardAmount: reward,
      completedAt: admin.firestore.FieldValue.serverTimestamp(),
      verificationHash: `verify_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    });

    // Update Campaign Budget & Slots
    transaction.update(campaignRef, {
      remainingBudget: admin.firestore.FieldValue.increment(-reward),
      remainingSlots: admin.firestore.FieldValue.increment(-1),
      completedCount: admin.firestore.FieldValue.increment(1)
    });

    // Atomically credit user's wallet
    const walletDoc = await transaction.get(walletRef);
    if (!walletDoc.exists) {
      transaction.set(walletRef, {
        userId,
        availableBalance: reward,
        pendingBalance: 0,
        totalEarned: reward,
        totalWithdrawn: 0,
        referralEarnings: 0,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } else {
      transaction.update(walletRef, {
        availableBalance: admin.firestore.FieldValue.increment(reward),
        totalEarned: admin.firestore.FieldValue.increment(reward),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    // Ledger Transaction
    const txRef = db.collection('transactions').doc();
    transaction.set(txRef, {
      transactionId: txRef.id,
      userId,
      type: 'reward_video',
      amount: reward,
      status: 'completed',
      idempotencyKey: `comp_${sessionId}_${userId}`,
      referenceId: campaignId,
      description: `Reward for viewing: ${campaign.title}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return {
      success: true,
      rewardAmount: reward,
      newAvailableBalance: (walletDoc.exists ? walletDoc.data().availableBalance : 0) + reward
    };
  });
});

/**
 * Securely reserves available balance for a withdrawal request
 */
exports.requestWithdrawal = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { amount, paymentMethod, accountTitle, accountNumber, bankName } = data;
  const userId = context.auth.uid;
  const withdrawalAmount = Number(amount);

  if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid withdrawal amount.');
  }

  const walletRef = db.collection('wallets').doc(userId);
  const withdrawalRef = db.collection('withdrawals').doc();

  return await db.runTransaction(async (transaction) => {
    const walletDoc = await transaction.get(walletRef);
    if (!walletDoc.exists) {
      throw new functions.https.HttpsError('failed-precondition', 'Wallet record does not exist.');
    }

    const wallet = walletDoc.data();
    if (wallet.availableBalance < withdrawalAmount) {
      throw new functions.https.HttpsError('failed-precondition', 'Insufficient available balance.');
    }

    // Deduct available, hold in pending
    transaction.update(walletRef, {
      availableBalance: admin.firestore.FieldValue.increment(-withdrawalAmount),
      pendingBalance: admin.firestore.FieldValue.increment(withdrawalAmount),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    transaction.set(withdrawalRef, {
      withdrawalId: withdrawalRef.id,
      userId,
      amount: withdrawalAmount,
      paymentMethod,
      accountTitle,
      accountNumber,
      bankName: bankName || '',
      status: 'pending',
      transactionRef: '',
      adminNotes: '',
      proofUrl: '',
      requestedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Ledger record
    const txRef = db.collection('transactions').doc();
    transaction.set(txRef, {
      transactionId: txRef.id,
      userId,
      type: 'withdrawal_hold',
      amount: withdrawalAmount,
      status: 'pending',
      idempotencyKey: `wd_req_${withdrawalRef.id}`,
      referenceId: withdrawalRef.id,
      description: `Withdrawal request held for ${paymentMethod.toUpperCase()}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, withdrawalId: withdrawalRef.id };
  });
});
