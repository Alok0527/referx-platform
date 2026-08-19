# 🚀 ReferX - Quick Start (5 Minutes)

Get ReferX running locally in under 5 minutes!

## Prerequisites
- Node.js 18+ installed
- Terminal/Command Prompt

## Step-by-Step

### 1️⃣ Install Dependencies (1 min)
```bash
npm install
```

### 2️⃣ Setup Database (1 min)
```bash
# Generate Prisma client
npm run prisma:generate

# Create database tables
npm run prisma:migrate

# When prompted, enter migration name:
init
```

### 3️⃣ Create Environment File (30 sec)
```bash
# Copy example env file
cp .env.example .env.local
```

**The .env.local file already has correct defaults for development!**

### 4️⃣ Start Development Server (1 min)
```bash
npm run dev
```

**You should see:**
```
✓ Ready in 2.5s
- Local:        http://localhost:3000
```

### 5️⃣ Open in Browser (30 sec)
Go to: **http://localhost:3000** ✨

---

## Test the Platform (2 minutes)

### Create Account 1 (Referrer)
1. Click "Sign Up"
2. Fill in details:
   ```
   Name: Test User 1
   Email: test1@example.com
   Username: testuser1
   Password: Test@123456
   ```
3. Click Sign Up
4. **Copy the referral code** from dashboard

### Create Account 2 (Referred User)
1. Open new private/incognito window
2. Go to: `http://localhost:3000/signup?ref=COPYCODE`
   (Replace COPYCODE with referral code from Account 1)
3. Fill in details:
   ```
   Name: Test User 2
   Email: test2@example.com
   Username: testuser2
   Password: Test@123456
   ```
4. Click Sign Up
5. **Check dashboard** - should show ₹50 bonus

### Verify Referrer
1. Login with Account 1 credentials
2. **Dashboard should show:**
   - Total Referrals: 1
   - Balance: ₹100

---

## Features Ready to Use

✅ **Sign Up** - Create account with referral link  
✅ **Login** - Secure authentication  
✅ **Dashboard** - View stats and referrals  
✅ **Referral Links** - Generate and share  
✅ **Tracking** - Real-time referral updates  
✅ **Rewards** - Automatic bonus distribution  

---

## Common Commands

```bash
npm run dev              # Start dev server
npm run prisma:studio   # View database in browser
npm run build           # Build for production
npm start               # Start production server
```

---

## File Structure

Important files:
```
app/
├── page.tsx             # Landing page
├── signup/page.tsx      # Sign up page
├── login/page.tsx       # Login page
├── dashboard/page.tsx   # User dashboard
└── api/
    ├── auth/signup      # Registration API
    ├── auth/login       # Login API
    └── user/dashboard   # Dashboard data API

prisma/
├── schema.prisma        # Database schema
└── dev.db              # SQLite database

components/ui/
├── button.tsx          # Button component
└── input.tsx           # Input component
```

---

## Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Database error?
```bash
npm run prisma:migrate
```

### Changes not showing?
- Save file
- Refresh browser

---

## Next Steps

1. ✅ Test sign up & referral (5 min)
2. Customize branding (colors, text)
3. Add more features
4. Deploy to production

---

## Environment Variables

Default values in `.env.local` are ready for development:

```env
DATABASE_URL="file:./prisma/dev.db"        # Local SQLite
JWT_SECRET="dev-secret-change-in-prod"     # Change for production
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**For production**, change secrets to random values!

---

## Need Help?

1. **Setup issues?** → See `SETUP.md`
2. **Deployment questions?** → See `DEPLOYMENT.md`
3. **Want more features?** → See `README.md`

---

## Database Explorer

View/edit database in browser:
```bash
npm run prisma:studio
```
Opens at: http://localhost:5555

---

**🎉 Ready to earn! Start referring friends!**

Questions? Check the documentation files:
- 📖 `README.md` - Full documentation
- 🔧 `SETUP.md` - Detailed setup guide
- 🚀 `DEPLOYMENT.md` - Deploy to production
