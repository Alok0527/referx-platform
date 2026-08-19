# ReferX - Complete Referral Platform 🚀

A fully functional referral platform built with Next.js where users can earn money by referring friends. This is a production-ready application with authentication, database, real-time tracking, and reward system.

## ✨ Features

- ✅ **User Authentication** - Secure sign up and login with JWT
- ✅ **Referral Links** - Generate unique referral codes for each user
- ✅ **Real-time Tracking** - Track referrals and earnings in real-time
- ✅ **Reward System** - Automatic reward distribution for successful referrals
- ✅ **Dashboard** - Beautiful analytics dashboard with charts and stats
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- ✅ **Database** - Prisma ORM with SQLite for easy setup
- ✅ **API Routes** - RESTful API endpoints for all functionality
- ✅ **Transaction History** - Complete transaction tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.3.1, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM + SQLite
- **Authentication**: JWT + bcrypt
- **UI Components**: Custom components + Recharts for analytics
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- SQLite (comes with most systems)

## 🚀 Quick Start

### 1. Clone or Download the Project

```bash
cd referx-complete
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env.local` and update if needed:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_SECRET="your-nextauth-secret-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 4. Setup Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate
```

When prompted, give your migration a name like: `init`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Application Features & Workflow

### 1. Landing Page (`/`)
- Overview of the platform
- Features showcase
- Call to action buttons

### 2. Sign Up (`/signup`)
- Create new account
- Auto-generates unique referral code
- Optional: Join via referral link for bonus
- Receives ₹50 signup bonus if referred

**Test Account:**
```
Email: test@example.com
Password: Test@123
```

### 3. Login (`/login`)
- Secure login with email and password
- JWT token stored in HTTP-only cookie

### 4. Dashboard (`/dashboard`)
- Real-time stats (referrals, earnings, balance)
- Referral link with one-click copy
- Recent referrals list
- Transaction history
- Withdrawal section

## 💰 Reward System

### How It Works:

1. **Sign Up Bonus**: User who signs up via referral gets ₹50
2. **Referral Bonus**: Person who referred gets ₹100
3. **Withdrawal**: Minimum ₹500 to withdraw (configurable)

### Example Scenario:

- User A signs up normally - gets no bonus
- User A shares their referral link
- User B signs up via User A's link
- User B gets ₹50 signup bonus
- User A gets ₹100 referral bonus
- Both can withdraw when they reach ₹500 balance

## 🗄️ Database Schema

### User Model
```
- id, email, password, name, username
- referralCode, totalRewards, totalReferrals
- profileImage, bio, isVerified
- createdAt, updatedAt
```

### Referral Model
```
- id, referrerId, referredId
- status (pending/completed/expired)
- rewardAmount, rewardStatus
- createdAt, expiresAt, completedAt
```

### Transaction Model
```
- id, userId
- type (earning/withdrawal/bonus)
- amount, description, status
- createdAt, updatedAt
```

### RewardConfig Model
```
- referralBonus (₹100 default)
- signupBonus (₹50 default)
- minimumWithdrawal (₹500 default)
- maxReferralsPerDay (100 default)
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### User
- `GET /api/user/dashboard` - Get dashboard data (requires auth)

## 🎨 UI Components

The project includes custom UI components in `/components/ui/`:
- `Button` - Reusable button with variants
- `Input` - Styled input field

## 📊 Dashboard Features

- **Stats Cards**: Display total referrals, balance, earnings, pending
- **Recent Referrals**: List of recent referrals with status
- **Transaction History**: All earnings and withdrawals
- **Referral Link**: Easy copy-to-clipboard functionality
- **Withdrawal Button**: Initiate withdrawal requests

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication with expiration
- ✅ HTTP-only cookies for token storage
- ✅ CORS-ready API routes
- ✅ Input validation
- ✅ Error handling

## 📝 Testing the Platform

### 1. Create First Account (Referrer)
```
- Go to /signup
- Fill in details
- Remember the referral code displayed
```

### 2. Share Referral Link
```
- Copy referral link from dashboard
- Format: http://localhost:3000/signup?ref=XXXXXX
```

### 3. Create Second Account (Via Referral)
```
- Click/use the referral link
- Fill in signup details
- Both accounts get rewards automatically
```

### 4. Check Dashboard
```
- Login to referrer account
- Should see 1 referral and ₹100 reward
- Go to referred account
- Should see ₹50 bonus
```

## 🚀 Deployment (Production)

### 1. Update Environment Variables
```
DATABASE_URL="postgresql://..." # Use PostgreSQL for production
JWT_SECRET="use-strong-random-secret"
NEXTAUTH_SECRET="use-strong-random-secret"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

### 2. Build for Production
```bash
npm run build
npm start
```

### 3. Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 4. Use PostgreSQL Database
Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 📚 File Structure

```
referx-complete/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts
│   │   │   └── login/route.ts
│   │   └── user/
│   │       └── dashboard/route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       └── input.tsx
├── lib/
│   ├── auth.ts
│   └── db.ts
├── prisma/
│   ├── schema.prisma
│   └── dev.db (created after migration)
├── .env.local
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## 🐛 Troubleshooting

### Database Issues
```bash
# Reset database (deletes all data)
rm prisma/dev.db
npm run prisma:migrate
```

### Prisma Client Issues
```bash
npm run prisma:generate
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Environment Variables Not Loading
- Make sure file is named `.env.local` (not `.env`)
- Restart dev server after changes

## 🔄 Workflow Summary

1. **User A Signs Up** → Gets unique referral code
2. **User A Shares Link** → Includes their referral code
3. **User B Clicks Link** → Sees referral code in URL
4. **User B Signs Up** → Referral code sent to backend
5. **Referral Created** → Link established between users
6. **Rewards Distributed** → Both users get bonuses
7. **Dashboard Updated** → Real-time stats visible

## 📞 Support & Questions

For issues or questions:
1. Check troubleshooting section
2. Review database schema
3. Check API routes
4. Check browser console for errors

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Next Steps to Enhance

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Admin dashboard for managing rewards
- [ ] Advanced analytics (graphs, conversion rates)
- [ ] Social sharing integration
- [ ] Withdrawal payment gateway integration
- [ ] SMS notifications
- [ ] Two-factor authentication
- [ ] Leaderboard feature
- [ ] Mobile app version

---

## 🎉 Congratulations!

You now have a fully functional referral platform! Start by:

1. Running `npm run dev`
2. Creating test accounts
3. Testing the referral system
4. Customizing colors and branding

**Happy coding! 🚀**
