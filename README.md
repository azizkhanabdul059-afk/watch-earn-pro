# WatchEarn Pro - International Online Rewards & Sponsored Video Platform

WatchEarn Pro is an international fintech reward platform that allows users from Pakistan and around the world to earn verified rewards without financial investment by viewing advertiser-funded sponsored video campaigns, participating in referral networks, and claiming approved bonuses.

---

## Architecture Overview

```
                      +---------------------------------------+
                      |       React 19 SPA (Vite + Tailwind)  |
                      |  - Dark Navy & Electric Blue Theme    |
                      |  - Dual Theme (Light/Dark Mode)       |
                      |  - 18 Fully Interactive Pages         |
                      |  - Anti-Fraud Watch Session Engine    |
                      +-------------------+-------------------+
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
             [Firebase Authentication]          [Firestore NoSQL Database]
             - Google / Email Auth              - Attribute-Based Access Control
             - Admin bootstrap validation       - Immutable Ledgers
             - Session Tokens                   - Zero-Trust Security Rules
                        |                                   |
                        +-----------------+-----------------+
                                          |
                                          v
                            [Firebase Cloud Functions]
                            - verifyCampaignCompletion
                            - requestWithdrawal
                            - adminApproveWithdrawal
                            - claimDailyBonus
```

## Supported Payout Methods

### Pakistan (PKR):
- **JazzCash**: Instant mobile wallet payout
- **Easypaisa**: Direct mobile account transfer
- **Bank Transfer**: All 1-Link participating banks (Meezan, HBL, UBL, Alfalah, etc.)

### International (USD):
- **PayPal**: Verified international merchant payouts
- **Crypto (USDT / TRC20)**: Fast decentralized settlements

---

## Anti-Fraud & Watch Verification System
- **Verifiable Session Tokens**: Backend issues single-use session tokens prior to video playback.
- **Playback Invariant Checks**: Enforces continuous tab visibility, prevents speed hacking, and validates periodic client heartbeats.
- **Server-Side Verification**: Balances are NEVER modified by browser timers. Rewards are processed through transactional idempotency keys.
- **Budget & Slot Enforcement**: Real-time campaign slot decrements prevent overspending advertiser deposits.

---

## Security Model & Rules
- **Firestore Security Rules**: Deployed with default-deny, role-based checks, and Master Gate relational integrity.
- **Client Privilege Isolation**: Direct client writes to `wallets` and `transactions` are blocked.
- **Admin Security**: Bootstrapped to `azizkhanabdul059@gmail.com` with elevated controls for campaign approvals and payout processing.

---

## Local Development & Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```
