# WatchEarn Pro - Firestore Security Specification & Invariants

## 1. System Invariants
1. **Wallet Balance Immutability**: Clients can NEVER directly modify `wallets/{userId}`. All balance adjustments, credits, and debits must occur via server-verified transactions (Cloud Functions / Express API) with server timestamps.
2. **Transaction Immutability**: Clients cannot write, update, or delete records in `/transactions/{transactionId}`. The ledger is write-only from trusted backend authority.
3. **Identity Verification & Ownership**: All user profiles `/users/{userId}` can only be read and updated by their authenticated owner (`request.auth.uid == userId`) or an admin.
4. **Campaign Integrity**: Campaigns in `/campaigns/{campaignId}` can only be created by registered advertisers and activated/approved by administrators.
5. **Session-Bound Completions**: A campaign completion cannot be claimed without a valid, non-expired, verified session token matching the user's UID and the campaign ID.
6. **Withdrawal State Transitions**: Users can only create withdrawal requests with status `pending`. Only administrators can transition a withdrawal status to `approved` or `rejected`. Once in a terminal state, non-admins cannot mutate it.
7. **Role Escalation Protection**: Users cannot modify their own `role` or `status` in `/users/{userId}`. Self-assignment of `admin` or `advertiser` is strictly blocked.
8. **PII Isolation**: Financial credentials (account numbers, bank details in withdrawals) and email addresses are restricted to the document owner and platform administrators.
9. **Single-Reward Guarantee**: Duplicate completions for the same campaign session or beyond daily limits are rejected at the rule and server layer.
10. **Rate and Size Hardening**: All string inputs must satisfy strict length boundaries (`<= 128` or `<= 500`), and all IDs must strictly match `^[a-zA-Z0-9_\-]+$`.

## 2. The "Dirty Dozen" Adversarial Payloads
The following payloads represent attack vectors tested against the rules:

1. **Self-Balance Injection**: Client attempting to directly increment `availableBalance` in `/wallets/{userId}`.
2. **Ghost Admin Escalation**: Client updating their user document with `role: "admin"`.
3. **Fake Transaction Fabrication**: Client attempting to write an unauthorized `type: "reward_video"` record to `/transactions/fake_tx_1`.
4. **Terminal Status Bypass**: Client attempting to overwrite an `approved` withdrawal back to `pending`.
5. **Withdrawal Self-Approval**: Client submitting a new withdrawal with `status: "approved"` directly.
6. **Cross-User Profile Hijacking**: Client `user_a` attempting to write to `/users/user_b`.
7. **Campaign Budget Alteration**: Non-admin user attempting to change `remainingBudget` on an active campaign.
8. **Malicious ID Injection**: Client writing to a document ID with 2000 characters or SQL/path injection syntax.
9. **Shadow Field Injection**: Adding unverified extra attributes (e.g. `isSuperuser: true`) during profile creation.
10. **Orphan Completion Record**: Writing directly to `/campaignCompletions` without server-side verification token.
11. **Cross-Tenant Withdrawal Scraping**: Client attempting to `list` or `get` withdrawals belonging to another user.
12. **Audit Log Erasure**: Client attempting to delete an entry from `/auditLogs`.
