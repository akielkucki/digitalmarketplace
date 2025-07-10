# DevMarket - Digital Marketplace Platform

A secure, scalable digital marketplace built with Next.js, featuring user authentication, role-based access control, and PostgreSQL integration.

## 🔐 Security First

This project implements enterprise-level security practices:
- ✅ No hardcoded secrets or credentials
- ✅ Environment variable validation
- ✅ Secure authentication with JWT
- ✅ Role-based access control
- ✅ SQL injection protection
- ✅ XSS protection with HTTP-only cookies

**Important**: Before running the application, copy `.env.example` to `.env.local` and set your environment variables.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Git

### Environment Setup
1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your configuration:
   ```env
   # Generate a secure JWT secret
   JWT_SECRET=$(openssl rand -base64 32)
   
   # Set your database credentials
   DB_PASSWORD=your-secure-database-password
   ```

### Installation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 📖 Documentation

- **📚 [Project Wiki](https://github.com/akielkucki/digitalmarketplace/wiki)** - Comprehensive documentation
- **🚀 [Quick Start Guide](https://github.com/akielkucki/digitalmarketplace/wiki/Quick-Start-Guide)** - Get running in 5 minutes
- **📡 [API Documentation](https://github.com/akielkucki/digitalmarketplace/wiki/API-Documentation)** - Complete API reference
- [Security Guidelines](./docs/SECURITY.md) - Comprehensive security checklist and best practices
- [Wiki Setup Guide](./docs/WIKI-SETUP.md) - How to set up the project wiki

## 🛠️ Utility Scripts

- **Wiki Setup**: `./scripts/setup-wiki.sh` - Automated GitHub wiki setup
- **Scripts Documentation**: [scripts/README.md](./scripts/README.md) - Available utility scripts

## 🛡️ Security Features

- **Environment Variable Validation** - Fails fast if required secrets are missing
- **Secure JWT Implementation** - HTTP-only cookies with proper expiration
- **Role-Based Access Control** - Hierarchical user permissions
- **Password Security** - bcrypt hashing with 12 salt rounds
- **SQL Injection Protection** - Parameterized queries throughout
- **Middleware Protection** - Route-level authentication checks

## 🔧 Production Deployment

See [SECURITY.md](./SECURITY.md) for production security checklist and requirements.

**Critical**: Generate unique secrets for production and never reuse development credentials.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
