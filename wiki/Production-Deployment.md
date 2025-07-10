# Production Deployment 🚀

Complete guide for deploying DevMarket to production environments.

## 🎯 Pre-deployment Checklist

### Security Requirements
- [ ] Generate unique JWT secret for production
- [ ] Set strong database passwords
- [ ] Enable SSL/TLS for all connections
- [ ] Configure proper CORS settings
- [ ] Set up rate limiting
- [ ] Enable security headers

### Environment Configuration
- [ ] All required environment variables set
- [ ] Database connection string configured
- [ ] App URLs point to production domains
- [ ] SSL certificates obtained
- [ ] DNS records configured

### Testing
- [ ] All tests passing
- [ ] Security audit completed (`npm audit`)
- [ ] Performance testing completed
- [ ] Database migrations tested
- [ ] Backup and restore procedures tested

## 🌐 Deployment Platforms

### Vercel (Recommended)
Vercel provides excellent Next.js integration with automatic deployments.

#### 1. Connect Repository
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# Follow the prompts to connect your GitHub repository
```

#### 2. Environment Variables
Set these in Vercel Dashboard → Project → Settings → Environment Variables:

```env
# Required
JWT_SECRET=<generate-unique-secret>
DB_PASSWORD=<production-database-password>

# Database
DB_HOST=<production-db-host>
DB_PORT=5432
DB_NAME=<production-db-name>
DB_USER=<production-db-user>
DB_SSL_MODE=require

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

#### 3. Domain Configuration
```bash
# Add custom domain
vercel domains add your-domain.com

# Configure DNS
# Add CNAME record: your-domain.com → cname.vercel-dns.com
```

### Netlify
Alternative deployment platform with good Next.js support.

#### Build Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### AWS (Advanced)
For enterprise deployments with full control.

#### Architecture
```
Internet → CloudFront → ALB → ECS/Lambda → RDS PostgreSQL
```

#### Infrastructure as Code (Terraform)
```hcl
# terraform/main.tf
resource "aws_ecs_cluster" "devmarket" {
  name = "devmarket-cluster"
}

resource "aws_db_instance" "postgres" {
  identifier = "devmarket-db"
  engine     = "postgres"
  engine_version = "14.9"
  instance_class = "db.t3.micro"
  
  allocated_storage = 20
  storage_encrypted = true
  
  db_name  = "devmarket"
  username = "postgres"
  password = var.db_password
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  skip_final_snapshot = false
  deletion_protection = true
}
```

## 🗄️ Database Setup

### PostgreSQL Configuration

#### Production Database
```sql
-- Create production database
CREATE DATABASE devmarket_prod;

-- Create application user with limited privileges
CREATE USER devmarket_app WITH PASSWORD 'secure-password';
GRANT CONNECT ON DATABASE devmarket_prod TO devmarket_app;
GRANT USAGE ON SCHEMA public TO devmarket_app;
GRANT CREATE ON SCHEMA public TO devmarket_app;
```

#### SSL Configuration
```env
# Force SSL in production
DB_SSL_MODE=require
DB_SSL_CERT=/path/to/client-cert.pem
DB_SSL_KEY=/path/to/client-key.pem
DB_SSL_CA=/path/to/ca-cert.pem
```

### Database Migration
```bash
# Run migrations in production
curl -X POST https://your-domain.com/api/migrate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## 🔒 Security Configuration

### Environment Variables

#### Generate Production Secrets
```bash
# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)

# Generate database password
DB_PASSWORD=$(openssl rand -base64 24)

# Generate app secret
APP_SECRET=$(openssl rand -hex 32)
```

#### Complete Production Environment
```env
# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-domain.com

# Authentication
JWT_SECRET=<generated-jwt-secret>
COOKIE_SECURE=true
COOKIE_SAME_SITE=strict

# Database
DB_HOST=<production-database-host>
DB_PORT=5432
DB_NAME=devmarket_prod
DB_USER=devmarket_app
DB_PASSWORD=<generated-db-password>
DB_SSL_MODE=require
DB_POOL_MIN=2
DB_POOL_MAX=10

# Monitoring
LOG_LEVEL=warn
SENTRY_DSN=<sentry-dsn>
```

### Security Headers
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
          }
        ]
      }
    ]
  }
}
```

## 📊 Monitoring & Logging

### Application Monitoring
```javascript
// lib/monitoring.js
import { createLogger, transports, format } from 'winston'

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
})
```

### Health Check Endpoint
```javascript
// pages/api/health.js
export default async function handler(req, res) {
  try {
    // Check database connection
    await query('SELECT 1')
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version
    })
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    })
  }
}
```

### Monitoring Setup
```bash
# Add monitoring dependencies
npm install @sentry/nextjs winston

# Configure Sentry
npx @sentry/wizard -i nextjs
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Security audit
        run: npm audit --audit-level=moderate

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🚀 Performance Optimization

### Next.js Configuration
```javascript
// next.config.js
module.exports = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif']
  },
  
  // Bundle analyzer
  analyzer: process.env.ANALYZE === 'true',
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true
  }
}
```

### Database Optimization
```sql
-- Add indexes for performance
CREATE INDEX CONCURRENTLY idx_users_email ON users (email);
CREATE INDEX CONCURRENTLY idx_sessions_user_id ON sessions (user_id);
CREATE INDEX CONCURRENTLY idx_projects_created_at ON projects (created_at DESC);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user@example.com';
```

## 🔧 Maintenance

### Backup Strategy
```bash
#!/bin/bash
# backup.sh - Daily database backup

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="/backups/devmarket_$DATE.sql"

pg_dump $DATABASE_URL > $BACKUP_PATH
gzip $BACKUP_PATH

# Upload to S3 (optional)
aws s3 cp "${BACKUP_PATH}.gz" s3://your-backup-bucket/
```

### Update Procedure
```bash
# 1. Backup database
./scripts/backup.sh

# 2. Deploy new version
vercel --prod

# 3. Run health checks
curl -f https://your-domain.com/api/health

# 4. Monitor logs
vercel logs --follow
```

## 📋 Production Checklist

### Pre-launch
- [ ] Load testing completed
- [ ] Security scan passed
- [ ] SSL certificate valid
- [ ] Monitoring configured
- [ ] Backup system tested
- [ ] Error tracking setup
- [ ] Performance baseline established

### Post-launch
- [ ] Monitor error rates
- [ ] Check response times
- [ ] Verify database performance
- [ ] Monitor resource usage
- [ ] Test backup/restore
- [ ] Update documentation

## 🆘 Troubleshooting

### Common Issues

**Database Connection Timeout**
```bash
# Check database connectivity
psql $DATABASE_URL -c "SELECT version();"

# Verify SSL configuration
psql "$DATABASE_URL?sslmode=require" -c "SELECT version();"
```

**High Memory Usage**
```bash
# Monitor memory usage
node --max-old-space-size=2048 server.js

# Enable garbage collection logging
node --expose-gc --trace-gc server.js
```

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Build with verbose logging
DEBUG=* npm run build
```

---

**🔗 Related Documentation:**
- [Security Overview](Security-Overview) - Security requirements
- [Environment Variables](Environment-Variables) - Configuration reference
- [Monitoring & Logging](Monitoring-&-Logging) - Production monitoring
