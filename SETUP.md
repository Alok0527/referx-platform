# ReferX Platform - Complete Setup Guide

## Step-by-Step Installation & Configuration

### Prerequisites Check
Before starting, verify you have:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

---

## Phase 1: Initial Setup

### Step 1: Navigate to Project Directory
```bash
cd referx-complete
```

### Step 2: Install All Dependencies
```bash
npm install
```
This will install:
- Next.js and React
- Prisma ORM
- Tailwind CSS
- Authentication libraries (bcryptjs, jsonwebtoken)
- UI libraries (recharts, lucide-react, axios)

**Expected output**: `added XXX packages, and audited XXX packages`

### Step 3: Create Environment File
```bash
# Copy the example env file
cp .env.example .env.local
```

Your `.env.local` should look like:
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_SECRET="your-nextauth-secret-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**Note**: For production, use strong random secrets!

---

## Phase 2: Database Setup

### Step 1: Generate Prisma Client
```bash
npm run prisma:generate
```
This creates the Prisma client from your schema.

### Step 2: Create Database Tables
```bash
npm run prisma:migrate
```

When prompted:
```
? Enter a name for this migration (or leave blank to skip)
→ init
```

This will:
- Create `prisma/dev.db` (SQLite file)
- Set up all tables: User, Referral, Transaction, RewardConfig
- Create necessary indexes

### Step 3: Seed Default Configuration (Optional)
```bash
# Run the seed script
npx prisma db seed
```

This creates default reward configuration:
- Referral Bonus: ₹100
- Signup Bonus: ₹50
- Minimum Withdrawal: ₹500

---

## Phase 3: Run Development Server

### Start the Server
```bash
npm run dev
```

**Expected output:**
```
> referx-referral-platform@1.0.0 dev
> next dev

  ▲ Next.js 16.3.1
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### Access the Application
Open browser and go to: **http://localhost:3000**

---

## Phase 4: Test the Application

### Test 1: Landing Page
- ✅ Navigate to `http://localhost:3000`
- ✅ Verify all sections load
- ✅ Click "Sign Up" button

### Test 2: Create First Account (Referrer)
1. Go to `/signup`
2. Fill in details:
   ```
   Name: John Doe
   Email: john@example.com
   Username: johndoe
   Password: Password123
   ```
3. Click "Sign Up"
4. Should redirect to `/dashboard`
5. **Copy your referral code** (displayed in dashboard)

### Test 3: Create Second Account (Via Referral)
1. Open new incognito/private window
2. Go to: `http://localhost:3000/signup?ref=XXXXX`
   (Replace XXXXX with referral code from Step 2)
3. Fill in details:
   ```
   Name: Jane Smith
   Email: jane@example.com
   Username: janesmith
   Password: Password123
   ```
4. Click "Sign Up"
5. Should redirect to `/dashboard`
6. Check balance: **should show ₹50 bonus**

### Test 4: Verify Referrer Dashboard
1. Go back to referrer's window (or open new private window)
2. Go to `/login`
3. Login with first account:
   ```
   Email: john@example.com
   Password: Password123
   ```
4. On dashboard, verify:
   - Total Referrals: **1**
   - Total Earnings: **₹100**
   - Available Balance: **₹100**
   - Recent Referrals list shows Jane Smith

---

## Development Workflow

### View Database in Browser
```bash
npm run prisma:studio
```
Opens Prisma Studio at `http://localhost:5555` to:
- View all records
- Edit data
- Delete records
- Test queries

### Reset Database (Delete All Data)
```bash
# Delete the database file
rm prisma/dev.db

# Recreate tables
npm run prisma:migrate
```

### Make Code Changes
1. Edit files in `/app` or `/components`
2. Next.js hot-reloads automatically
3. Refresh browser to see changes

---

## Troubleshooting

### Issue: "Database doesn't exist"
```bash
# Solution: Create database
npm run prisma:migrate
```

### Issue: "Prisma client not generated"
```bash
# Solution: Generate client
npm run prisma:generate
```

### Issue: "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: ".env.local not working"
- ✅ Verify file exists and is named `.env.local`
- ✅ Restart dev server after adding/changing variables
- ✅ Check for typos in variable names

### Issue: "Cannot find module '@/lib/db'"
```bash
# Solution: Verify tsconfig.json path mapping and restart
npm run dev
```

### Issue: "Password verification fails at login"
- ✅ Ensure password was hashed during signup
- ✅ Check if user exists in database
- ✅ Verify database credentials in .env.local

---

## File Locations & What They Do

```
📁 referx-complete/
├── 📁 app/                          # Next.js app directory
│   ├── 📁 api/                      # API routes
│   │   ├── 📁 auth/                 # Authentication routes
│   │   │   ├── signup/route.ts      # Register new users
│   │   │   ├── login/route.ts       # User login
│   │   │   └── logout/route.ts      # Logout
│   │   └── 📁 user/                 # User routes
│   │       ├── dashboard/route.ts   # Get dashboard data
│   │       ├── stats/route.ts       # Get user statistics
│   │       └── withdrawal/route.ts  # Process withdrawal
│   ├── page.tsx                     # Landing page (/)
│   ├── signup/page.tsx              # Sign up page (/signup)
│   ├── login/page.tsx               # Login page (/login)
│   ├── dashboard/page.tsx           # Dashboard (/dashboard)
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
├── 📁 components/                   # Reusable components
│   └── 📁 ui/                       # UI components
│       ├── button.tsx               # Button component
│       └── input.tsx                # Input component
├── 📁 lib/                          # Utility functions
│   ├── db.ts                        # Database client
│   └── auth.ts                      # Authentication utils
├── 📁 prisma/                       # Database config
│   ├── schema.prisma                # Database schema
│   ├── dev.db                       # SQLite database (created)
│   └── seed.ts                      # Seed script
├── package.json                     # Project dependencies
├── next.config.ts                   # Next.js config
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind CSS config
├── .env.local                       # Environment variables
└── README.md                        # Documentation
```

---

## Building for Production

### Step 1: Update Environment Variables
Create `.env.production` with:
```env
DATABASE_URL="postgresql://user:pass@host/dbname"  # Use PostgreSQL!
JWT_SECRET="use-a-strong-random-secret-here"
NEXTAUTH_SECRET="use-a-strong-random-secret-here"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
```

### Step 2: Build the Project
```bash
npm run build
```

### Step 3: Test Production Build Locally
```bash
npm start
```

### Step 4: Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## Database Migration (SQLite → PostgreSQL)

For production deployment using PostgreSQL:

### Step 1: Update Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  # Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### Step 2: Create Migration
```bash
npm run prisma:migrate
```
Name it: `migrate_to_postgresql`

### Step 3: Update Environment
Set `DATABASE_URL` to your PostgreSQL connection string

---

## API Endpoints Reference

### Authentication
```
POST /api/auth/signup
Body: { email, password, name, username, referralCode? }
Response: { user, token in cookie }

POST /api/auth/login
Body: { email, password }
Response: { user, token in cookie }

POST /api/auth/logout
Response: { success, message }
```

### User Data
```
GET /api/user/dashboard
Response: { user, stats, referrals, transactions }

GET /api/user/stats
Response: { stats: { totalReferrals, earnings, balance, etc } }

POST /api/user/withdrawal
Body: { amount, accountNumber, accountHolder, bankName }
Response: { success, transaction }
```

---

## Next Steps

After setup is complete:

1. **Test thoroughly**: Follow Phase 4 tests
2. **Customize branding**: Update logo, colors, copy
3. **Add more features**:
   - Email verification
   - Password reset
   - Admin dashboard
   - Payment integration
4. **Deploy to production**: Follow production build steps
5. **Monitor and maintain**: Use logs and Prisma Studio

---

## Support Checklist

Before asking for help, verify:
- [ ] Node.js version is 18+
- [ ] All npm packages installed (`npm install`)
- [ ] `.env.local` file exists with all variables
- [ ] Database created (`npm run prisma:migrate`)
- [ ] Dev server running (`npm run dev`)
- [ ] No console errors in browser
- [ ] Database file exists at `prisma/dev.db`

---

## Quick Commands Reference

```bash
# Development
npm run dev                    # Start dev server
npm run prisma:studio        # Open database browser

# Database
npm run prisma:generate      # Generate Prisma client
npm run prisma:migrate       # Create/run migrations
npm run prisma:seed          # Run seed script

# Production
npm run build                # Build for production
npm start                    # Start production server

# Cleanup
rm prisma/dev.db            # Delete database
rm node_modules             # Delete dependencies (reinstall with npm install)
```

---

**🎉 You're all set! Start building your referral empire!** 🚀
