# Quick Start Guide 🚀

Get DevMarket up and running in just 5 minutes!

## Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed
- **PostgreSQL 14+** running
- **Git** for version control

## 1. Clone the Repository

```bash
git clone https://github.com/akielkucki/digitalmarketplace.git
cd digitalmarketplace
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Environment Setup

Copy the environment template and configure your settings:

```bash
cp .env.example .env.local
```

### Generate Secure Secrets

```bash
# Generate a secure JWT secret
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env.local
```

### Configure Database

Update `.env.local` with your PostgreSQL credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-secure-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 4. Database Setup

Run the database migrations:

```bash
# Create database tables
curl -X POST http://localhost:3000/api/migrate
```

## 5. Start Development Server

```bash
npm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## 🎉 You're Ready!

### Test the Setup

1. **Visit the homepage**: [http://localhost:3000](http://localhost:3000)
2. **Create an account**: Click "Sign Up" and register
3. **Login**: Use your new credentials
4. **Access dashboard**: Verify protected routes work

### API Endpoints

Test the API endpoints:

```bash
# Health check
curl http://localhost:3000/api/auth/me

# Database test
curl http://localhost:3000/api/db-test
```

## Next Steps

- 📖 Read the [Project Structure](Project-Structure) guide
- 🔐 Review [Security Overview](Security-Overview)
- 🛠️ Check out [Development Workflow](Development-Workflow)
- 🚀 Plan your [Production Deployment](Production-Deployment)

## Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Connection Failed
1. Ensure PostgreSQL is running
2. Verify credentials in `.env.local`
3. Check database exists and is accessible

### Environment Variables Missing
The app validates required environment variables on startup. If you see validation errors, ensure all required variables are set in `.env.local`.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Security audit
npm audit
```

---

**🎯 Pro Tip**: The application includes comprehensive error handling and validation. If something doesn't work, check the console logs for detailed error messages.

**📚 Next**: Ready to dive deeper? Check out the [Installation & Setup](Installation-&-Setup) guide for detailed configuration options.
