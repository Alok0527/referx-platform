# 🚀 ReferX - VS Code Complete Installation Guide

**Complete step-by-step guide to set up everything in VS Code**

---

## ✅ Prerequisites (Check These First)

### 1. Check Node.js Installation
```bash
node --version
npm --version
```
**Should be:** Node v18+ and npm v9+

If not installed:
- Download: https://nodejs.org/ (LTS version)
- Install it
- Restart computer

### 2. VS Code
Download: https://code.visualstudio.com/

### 3. Git (Optional but recommended)
Download: https://git-scm.com/

---

## 📁 STEP 1: Create Project Folder

### On Windows:
1. Open File Explorer
2. Go to Desktop or Documents
3. Right-click → New Folder
4. Name it: `referx-app`
5. Open it
6. Click address bar at top
7. Type: `cmd`
8. Press Enter

### On Mac/Linux:
```bash
cd Desktop
mkdir referx-app
cd referx-app
```

---

## 🔧 STEP 2: Open in VS Code

### Method 1 (Easy):
1. Open VS Code
2. File → Open Folder
3. Select `referx-app` folder
4. Click Open

### Method 2 (Terminal):
```bash
code .
```

---

## 📦 STEP 3: Create All Files

In VS Code, follow these instructions to create files:

### A) Create `.gitignore` file

1. Click "New File" icon (top left)
2. Name it: `.gitignore`
3. Copy-paste this:

```
node_modules
.pnp
.pnp.js
coverage
.next
out
build
dist
prisma/*.db
prisma/*.db-journal
.env
.env.local
.env.*.local
.vscode
.idea
*.swp
*.swo
*~
.DS_Store
Thumbs.db
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*
```

### B) Create `.env.example` file

```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_SECRET="your-nextauth-secret-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### C) Create `package.json` file

```json
{
  "name": "referx-referral-platform",
  "version": "1.0.0",
  "description": "Complete working referral platform",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "react": "^19.0.0-rc-66f6467-20241121",
    "react-dom": "^19.0.0-rc-66f6467-20241121",
    "next": "^16.3.1",
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@prisma/client": "^5.17.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.1.2",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16",
    "@radix-ui/react-slot": "^2.0.2",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0",
    "lucide-react": "^0.383.0",
    "recharts": "^2.12.7",
    "axios": "^1.6.8"
  },
  "devDependencies": {
    "prisma": "^5.17.0",
    "eslint": "^8",
    "eslint-config-next": "^16.3.1"
  }
}
```

### D) Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### E) Create `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
```

### F) Create `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

### G) Create `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

### H) Create `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailcss": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  },
  "aliases": {
    "@/components": "./components",
    "@/ui": "./components/ui",
    "@/lib": "./lib"
  }
}
```

### I) Create `eslint.config.mjs`

```javascript
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

---

## 📁 STEP 4: Create Folder Structure

In VS Code, create these folders by right-clicking in Explorer:

```
referx-app/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   ├── login/
│   │   │   └── logout/
│   │   └── user/
│   │       ├── dashboard/
│   │       ├── stats/
│   │       └── withdrawal/
│   ├── signup/
│   ├── login/
│   ├── dashboard/
│   ├── styles/
│   ├── api/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
├── lib/
├── prisma/
└── [config files]
```

---

## 💾 STEP 5: Create All Source Code Files

### Create: `lib/db.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Create: `lib/auth.ts`

```typescript
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '30d' }
  )
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
    return decoded
  } catch {
    return null
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) return null

    const decoded = verifyToken(token)
    return decoded
  } catch {
    return null
  }
}

export function generateReferralLink(referralCode: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL}/signup?ref=${referralCode}`
}

export function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}
```

### Create: `components/ui/button.tsx`

```typescript
import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none"
    
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-50 disabled:bg-gray-100"
    }

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
```

### Create: `components/ui/input.tsx`

```typescript
import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 ${
        className || ""
      }`}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }
```

### Create: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String     @id @default(cuid())
  email         String     @unique
  password      String
  name          String
  username      String     @unique
  profileImage  String?
  bio           String?
  referralCode  String     @unique @default(cuid())
  totalRewards  Float      @default(0)
  totalReferrals Int       @default(0)
  isVerified    Boolean    @default(false)
  
  referrals     Referral[] @relation("referrer")
  referredBy    Referral? @relation("referred")
  transactions  Transaction[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}

model Referral {
  id            String     @id @default(cuid())
  referrerId    String
  referrer      User       @relation("referrer", fields: [referrerId], references: [id], onDelete: Cascade)
  referredId    String     @unique
  referred      User       @relation("referred", fields: [referredId], references: [id], onDelete: Cascade)
  
  status        String     @default("pending")
  rewardAmount  Float      @default(0)
  rewardStatus  String     @default("pending")
  
  createdAt     DateTime   @default(now())
  expiresAt     DateTime   @default(dbgenerated("datetime('now', '+30 days')"))
  completedAt   DateTime?
  
  @@index([referrerId])
  @@index([referredId])
}

model Transaction {
  id            String     @id @default(cuid())
  userId        String
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type          String
  amount        Float
  description   String
  status        String     @default("pending")
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([userId])
}

model RewardConfig {
  id            String     @id @default(cuid())
  referralBonus Float      @default(100)
  signupBonus   Float      @default(50)
  minimumWithdrawal Float  @default(500)
  maxReferralsPerDay Int   @default(100)
  
  updatedAt     DateTime   @updatedAt
}
```

---

## 🎨 STEP 6: Create CSS File

### Create: `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

button, input, select, textarea {
  transition: all 0.2s ease;
}

:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

---

## 📄 STEP 7: Create Page Components

### Create: `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReferX - Referral Platform",
  description: "Earn rewards by referring friends to our platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### Create: `app/page.tsx`

```typescript
'use client'

import Link from "next/link";
import { ArrowRight, Gift, Users, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">ReferX</div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Earn Money by Sharing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Refer your friends to ReferX and earn rewards for every successful referral. 
              Start building your passive income today!
            </p>
            <div className="space-x-4">
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl h-96 flex items-center justify-center text-white text-4xl font-bold">
            Earn While You Share
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ReferX?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Gift className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Instant Rewards</h3>
              <p className="text-gray-600">
                Get ₹100 for every friend who signs up using your referral link
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Unlimited Referrals</h3>
              <p className="text-gray-600">
                There's no limit to how many people you can refer and earn from
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor your referrals and earnings in real-time on your dashboard
              </p>
            </div>

            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Secure Payouts</h3>
              <p className="text-gray-600">
                Fast and secure withdrawal options with minimum threshold of ₹500
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 ReferX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
```

### Create: `app/signup/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

export default function SignUp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referralCode = searchParams.get('ref')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setLoading(true)
      await axios.post('/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        referralCode: referralCode
      })

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Join ReferX</h1>
        <p className="text-center text-gray-600 mb-8">
          Start earning by referring friends
        </p>

        {referralCode && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-green-800">
              ✓ You have a referral bonus waiting!
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
```

### Create: `app/login/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      })

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">
          Login to your ReferX account
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}
```

### Create: `app/dashboard/page.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Copy, LogOut, TrendingUp, Users, Gift, Wallet } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [referrals, setReferrals] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/user/dashboard')
      setUser(response.data.user)
      setStats(response.data.stats)
      setReferrals(response.data.referrals)
      setTransactions(response.data.transactions)
    } catch (error) {
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/')
  }

  const handleCopyReferralLink = () => {
    if (user?.referralCode) {
      const link = `${process.env.NEXT_PUBLIC_API_URL}/signup?ref=${user.referralCode}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">ReferX Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600">
                Your unique referral code: <span className="font-mono font-bold text-blue-600">{user?.referralCode}</span>
              </p>
            </div>
            <Button
              onClick={handleCopyReferralLink}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Referrals</p>
                <p className="text-4xl font-bold text-gray-900">{stats?.totalReferrals || 0}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Available Balance</p>
                <p className="text-4xl font-bold text-gray-900">₹{stats?.availableBalance?.toLocaleString('en-IN') || 0}</p>
              </div>
              <Wallet className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                <p className="text-4xl font-bold text-gray-900">₹{stats?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Withdrawal</p>
                <p className="text-4xl font-bold text-gray-900">₹{stats?.pendingWithdrawals?.toLocaleString('en-IN') || 0}</p>
              </div>
              <Gift className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Referrals</h3>
          
          {referrals.length > 0 ? (
            <div className="space-y-4">
              {referrals.slice(0, 5).map((ref: any) => (
                <div key={ref.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{ref.referred.name}</p>
                      <p className="text-sm text-gray-600">{ref.referred.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        +₹{ref.rewardAmount}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        ref.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {ref.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No referrals yet. Share your code to get started!</p>
            </div>
          )}
        </div>

        {/* Withdrawal Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Withdraw?</h3>
              <p className="opacity-90">
                Minimum withdrawal amount: ₹{stats?.minimumWithdrawal || 500}
              </p>
            </div>
            <Button
              disabled={stats?.availableBalance < stats?.minimumWithdrawal}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-2"
            >
              Withdraw Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
```

---

## 🔧 STEP 8: Create API Routes

### Create: `app/api/auth/signup/route.ts`

```typescript
import { prisma } from '@/lib/db'
import { hashPassword, createToken, generateReferralCode } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, username, referralCode } = await request.json()

    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        referralCode: generateReferralCode()
      }
    })

    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode }
      })

      if (referrer) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: user.id,
            status: 'completed',
            rewardAmount: 100,
            rewardStatus: 'approved'
          }
        })

        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            totalRewards: { increment: 100 },
            totalReferrals: { increment: 1 }
          }
        })

        await prisma.transaction.create({
          data: {
            userId: referrer.id,
            type: 'earning',
            amount: 100,
            description: `Referral bonus from ${user.email}`,
            status: 'completed'
          }
        })

        await prisma.user.update({
          where: { id: user.id },
          data: {
            totalRewards: { increment: 50 }
          }
        })

        await prisma.transaction.create({
          data: {
            userId: user.id,
            type: 'bonus',
            amount: 50,
            description: 'Welcome bonus for signing up via referral',
            status: 'completed'
          }
        })
      }
    }

    const token = createToken(user.id, user.email)

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        referralCode: user.referralCode,
        totalRewards: user.totalRewards
      }
    }, { status: 201 })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Create: `app/api/auth/login/route.ts`

```typescript
import { prisma } from '@/lib/db'
import { verifyPassword, createToken } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const token = createToken(user.id, user.email)

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        referralCode: user.referralCode,
        totalRewards: user.totalRewards,
        totalReferrals: user.totalReferrals
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Create: `app/api/user/dashboard/route.ts`

```typescript
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        profileImage: true,
        referralCode: true,
        totalRewards: true,
        totalReferrals: true,
        createdAt: true
      }
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const referrals = await prisma.referral.findMany({
      where: { referrerId: user.userId },
      include: {
        referred: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const transactions = await prisma.transaction.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    const totalEarnings = transactions
      .filter(t => t.type === 'earning' || t.type === 'bonus')
      .reduce((sum, t) => sum + t.amount, 0)

    const pendingWithdrawals = transactions
      .filter(t => t.type === 'withdrawal' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)

    const rewardConfig = await prisma.rewardConfig.findFirst()

    return NextResponse.json({
      user: userData,
      stats: {
        totalReferrals: userData.totalReferrals,
        totalEarnings: totalEarnings,
        availableBalance: userData.totalRewards,
        pendingWithdrawals: pendingWithdrawals,
        minimumWithdrawal: rewardConfig?.minimumWithdrawal || 500
      },
      referrals: referrals,
      transactions: transactions
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## ⚡ STEP 9: Copy `.env.local`

In VS Code terminal or command prompt:

```bash
cp .env.example .env.local
```

File content should be:
```
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_SECRET="your-nextauth-secret-key-change-in-production"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

---

## 🚀 STEP 10: Install & Run

### In VS Code Terminal (Ctrl + ~):

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npm run prisma:generate

# 3. Create database
npm run prisma:migrate

# When prompted, type: init

# 4. Start dev server
npm run dev
```

**Wait for:**
```
✓ Ready in 2.5s
- Local:        http://localhost:3000
```

---

## 🎉 STEP 11: Open in Browser

Go to: **http://localhost:3000**

---

## ✅ Test It

1. Click "Sign Up"
2. Fill details
3. Click Sign Up
4. Open new private window
5. Go to: `http://localhost:3000/signup?ref=YOURCODE`
6. Fill details  
7. Both should have rewards!

---

## 📞 If Stuck

1. Check terminal for errors
2. Make sure all files created
3. Check `.env.local` exists
4. Restart server: `npm run dev`

---

**🎊 Congratulations! You have a complete working referral platform!**
