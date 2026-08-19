# ReferX - Deployment Guide

Complete guide to deploy ReferX to production on various platforms.

---

## 🔒 Pre-Deployment Checklist

Before deploying, ensure:
- [ ] All tests pass locally
- [ ] No console errors in browser
- [ ] Database migrations completed
- [ ] Environment variables configured
- [ ] Security review completed
- [ ] Payment gateway configured (if needed)
- [ ] Email service configured (if needed)

---

## Option 1: Deploy to Vercel (Recommended) ⭐

Vercel is the easiest platform for Next.js deployment.

### Step 1: Prepare GitHub Repository
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: ReferX referral platform"

# Push to GitHub
git push origin main
```

### Step 2: Sign Up on Vercel
- Go to https://vercel.com/signup
- Sign up with GitHub account

### Step 3: Import Project
1. Click "New Project"
2. Select your GitHub repository
3. Vercel auto-detects Next.js

### Step 4: Configure Environment Variables
1. Go to "Settings" → "Environment Variables"
2. Add all variables from `.env.local`:
   ```
   DATABASE_URL=postgresql://user:pass@host/dbname
   JWT_SECRET=your-strong-secret-key
   NEXTAUTH_SECRET=your-strong-secret-key
   NEXT_PUBLIC_API_URL=https://yourdomain.vercel.app
   ```

### Step 5: Setup PostgreSQL Database

**Option A: Using Vercel Postgres (Easiest)**
1. Click "Storage" → "Create Database" → "Postgres"
2. Copy the connection string to `DATABASE_URL`

**Option B: Using External Database**
1. Create PostgreSQL database on:
   - AWS RDS
   - Heroku
   - DigitalOcean
   - Railway.app
2. Copy connection string to `DATABASE_URL`

### Step 6: Update Prisma Schema
Edit `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 7: Deploy
1. Click "Deploy"
2. Vercel automatically builds and deploys
3. Your app is live at `https://yourdomain.vercel.app`

### Step 8: Run Database Migrations
After deployment:
```bash
# Run migrations on production
vercel env pull  # Get prod environment
npx prisma migrate deploy
```

---

## Option 2: Deploy to Railway.app

Fast and simple deployment with built-in PostgreSQL.

### Step 1: Create Account
- Go to https://railway.app
- Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub"
3. Select your repository

### Step 3: Add PostgreSQL Service
1. Click "Add Service"
2. Select "PostgreSQL"
3. Railway creates database automatically

### Step 4: Configure Environment Variables
1. Click your project
2. Go to "Variables"
3. Copy `DATABASE_URL` from PostgreSQL service
4. Add other variables:
   ```
   JWT_SECRET=your-strong-secret-key
   NEXTAUTH_SECRET=your-strong-secret-key
   NEXT_PUBLIC_API_URL=https://yourdomain.railway.app
   ```

### Step 5: Deploy
Railway automatically deploys on every push to main branch.

---

## Option 3: Deploy to DigitalOcean App Platform

Good option if you want more control.

### Step 1: Create DigitalOcean Account
- Go to https://www.digitalocean.com
- Sign up and add payment method

### Step 2: Create App
1. Go to "Apps" (Beta)
2. Click "Create Apps"
3. Connect GitHub repository

### Step 3: Create PostgreSQL Database
1. In DigitalOcean dashboard, create managed PostgreSQL
2. Copy connection string

### Step 4: Configure App
1. Set build command: `npm run build`
2. Set start command: `npm start`
3. Set environment variables

### Step 5: Deploy
Click "Deploy" to build and launch your app.

---

## Option 4: Self-Hosted (Linux Server)

For complete control and customization.

### Prerequisites
```bash
# On your server, install:
- Node.js 18+
- PostgreSQL 13+
- Nginx (reverse proxy)
- PM2 (process manager)
```

### Step 1: Setup Server
```bash
# SSH into your server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx
```

### Step 2: Clone Repository
```bash
cd /var/www
git clone https://github.com/yourusername/referx.git
cd referx
npm install
```

### Step 3: Setup PostgreSQL
```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE referx_db;
CREATE USER referx_user WITH PASSWORD 'strong-password';
ALTER ROLE referx_user SET client_encoding TO 'utf8mb4';
ALTER ROLE referx_user SET default_transaction_isolation TO 'read committed';
GRANT ALL PRIVILEGES ON DATABASE referx_db TO referx_user;
\q
```

### Step 4: Configure Environment
```bash
# Create .env.production
cat > .env.production << EOF
DATABASE_URL="postgresql://referx_user:strong-password@localhost:5432/referx_db"
JWT_SECRET="your-strong-secret-key"
NEXTAUTH_SECRET="your-strong-secret-key"
NEXT_PUBLIC_API_URL="https://yourdomain.com"
NODE_ENV="production"
EOF
```

### Step 5: Build and Run with PM2
```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name "referx" -- start

# Make it restart on reboot
pm2 startup
pm2 save
```

### Step 6: Configure Nginx
```bash
# Create Nginx config
sudo tee /etc/nginx/sites-available/referx > /dev/null <<EOF
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/referx /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### Step 7: Setup HTTPS (Let's Encrypt)
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Generate certificate
certbot --nginx -d yourdomain.com

# Auto-renewal
systemctl start certbot.timer
systemctl enable certbot.timer
```

---

## Post-Deployment Setup

### 1. Run Database Migrations
```bash
npx prisma migrate deploy
```

### 2. Seed Reward Configuration
```bash
npx prisma db seed
```

### 3. Verify Application
1. Open your deployed URL
2. Test sign up process
3. Test referral system
4. Check database in Prisma Studio

### 4. Setup Monitoring
- Monitor logs: `pm2 logs` (self-hosted)
- Setup error tracking: Sentry.io
- Monitor performance: Vercel Analytics
- Database backups: Automated daily

### 5. Setup Email (Optional)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Production Environment Variables

Use strong, random secrets generated with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Complete production `.env`:
```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/referx_db"

# Authentication
JWT_SECRET="[generate-random-secret]"
NEXTAUTH_SECRET="[generate-random-secret]"

# API
NEXT_PUBLIC_API_URL="https://yourdomain.com"
NODE_ENV="production"

# Email (Optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Monitoring (Optional)
SENTRY_DSN="https://..."
```

---

## Performance Optimization

### 1. Enable Caching
Add to `next.config.ts`:
```typescript
headers: async () => [
  {
    source: '/api/(.*)',
    headers: [
      { key: 'Cache-Control', value: 'no-store' }
    ]
  }
]
```

### 2. Database Connection Pooling
```env
DATABASE_URL="postgresql://...?schema=public&pool_size=10"
```

### 3. Image Optimization
Update `next.config.ts`:
```typescript
images: {
  formats: ['image/avif', 'image/webp']
}
```

---

## Security Hardening

### 1. CORS Configuration
Add to API routes:
```typescript
response.headers.set('Access-Control-Allow-Origin', 'https://yourdomain.com')
response.headers.set('X-Content-Type-Options', 'nosniff')
response.headers.set('X-Frame-Options', 'DENY')
```

### 2. Rate Limiting
```bash
npm install rate-limit express-rate-limit
```

### 3. Input Validation
```bash
npm install zod
```

### 4. CSRF Protection
Next.js includes built-in CSRF protection with SameSite cookies.

---

## Monitoring & Maintenance

### Health Check
```bash
# Add endpoint to check status
GET /api/health
```

### Database Backups
- Vercel Postgres: Automatic daily backups
- Railway: Automatic weekly backups
- Self-hosted: Setup automated backups
  ```bash
  pg_dump referx_db > backup.sql
  ```

### Log Monitoring
```bash
# PM2 logs
pm2 logs

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## Troubleshooting Deployment

### Issue: "Database connection failed"
- ✅ Verify DATABASE_URL environment variable
- ✅ Check database credentials
- ✅ Ensure PostgreSQL is running
- ✅ Check firewall rules

### Issue: "Build fails"
```bash
# Clear build cache
rm -rf .next
npm run build
```

### Issue: "404 errors on routes"
- ✅ Verify file structure
- ✅ Check route paths
- ✅ Clear browser cache

### Issue: "Slow performance"
- ✅ Enable database connection pooling
- ✅ Add image optimization
- ✅ Use CDN for static assets
- ✅ Enable gzip compression

---

## Cost Estimates

| Platform | Database | Hosting | Monthly |
|----------|----------|---------|---------|
| Vercel | $10-50 | Free-$20 | $10-70 |
| Railway | Included | Free-$5 | Free-$5 |
| DigitalOcean | $12+ | $5+ | $17+ |
| AWS | Varies | Varies | $20+ |

---

## Scaling Strategy

### Phase 1: MVP (0-1000 users)
- Single server
- SQLite or small Postgres
- Cost: Free-$20/month

### Phase 2: Growth (1000-10k users)
- Separate database
- CDN for static files
- Cost: $50-100/month

### Phase 3: Scale (10k+ users)
- Multiple app servers
- Database replication
- Redis caching
- Cost: $200+/month

---

## Support & Help

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Railway Support**: https://railway.app/support

---

**Happy Deploying! 🚀**
