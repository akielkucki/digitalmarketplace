# API Documentation 📡

Complete reference for all DevMarket API endpoints.

## 🌐 Base URL

```
Development: http://localhost:3000
Production: https://your-domain.com
```

## 🔐 Authentication

All protected endpoints require a valid JWT token sent via HTTP-only cookies.

### Authentication Headers
```http
Cookie: auth-token=<jwt-token>
```

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

## 👤 Authentication Endpoints

### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe"
}
```

**Validation Rules:**
- Email: Valid email format
- Password: 8+ characters, uppercase, lowercase, number
- Name: 2-50 characters

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "created_at": "2025-01-15T10:00:00Z"
    }
  },
  "message": "Account created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

### POST /api/auth/login
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  },
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### POST /api/auth/logout
Destroy user session.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /api/auth/me
Get current authenticated user information.

**Authentication Required:** Yes

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user",
      "created_at": "2025-01-15T10:00:00Z"
    }
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Authentication required"
}
```

## 🏢 Guilds Endpoints

### GET /api/guilds
Get list of guilds (placeholder endpoint).

**Authentication Required:** Yes

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "guilds": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0
    }
  }
}
```

## 🔧 Utility Endpoints

### POST /api/migrate
Run database migrations (development only).

**Request Body:** None

**Response (200):**
```json
{
  "success": true,
  "message": "Database migrations completed successfully"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Migration failed: <error-message>"
}
```

### GET /api/db-test
Test database connectivity.

**Response (200):**
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "timestamp": "2025-01-15T10:00:00Z",
    "database": "postgres"
  }
}
```

## 📝 Request/Response Examples

### cURL Examples

**Register User:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "name": "Test User"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

**Get Current User:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

**Logout:**
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

### JavaScript/Fetch Examples

**Register User:**
```javascript
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'TestPassword123',
    name: 'Test User'
  })
})

const data = await response.json()
```

**Login with Session:**
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Important for cookies
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'TestPassword123'
  })
})
```

## ⚠️ Error Handling

### Common Error Codes

| Status | Code | Description |
|--------|------|-------------|
| 400 | Bad Request | Invalid request body or parameters |
| 401 | Unauthorized | Authentication required or invalid |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation errors |
| 500 | Internal Server Error | Server error |

### Error Response Format
```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "validation error details"
  }
}
```

### Validation Errors
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

## 🔒 Security Considerations

### Rate Limiting
- **Login attempts**: 5 per minute per IP
- **Signup attempts**: 3 per minute per IP
- **API calls**: 100 per minute per user

### CORS Policy
```javascript
{
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### Security Headers
All API responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📊 Status Codes Reference

### Success Codes
- `200` - OK (GET, PUT, DELETE)
- `201` - Created (POST)
- `204` - No Content (DELETE)

### Client Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Unprocessable Entity

### Server Error Codes
- `500` - Internal Server Error
- `502` - Bad Gateway
- `503` - Service Unavailable

## 🧪 Testing the API

### Postman Collection
Import the Postman collection for easy testing:
```json
{
  "info": {
    "name": "DevMarket API",
    "version": "1.0.0"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

### API Testing Script
```bash
#!/bin/bash
BASE_URL="http://localhost:3000"

# Test signup
echo "Testing signup..."
curl -X POST $BASE_URL/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123","name":"Test User"}'

# Test login
echo "Testing login..."
curl -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"Test123"}'

# Test protected route
echo "Testing protected route..."
curl -X GET $BASE_URL/api/auth/me -b cookies.txt
```

---

**📚 Related Documentation:**
- [Authentication System](Authentication-System) - Detailed auth implementation
- [Security Overview](Security-Overview) - Security features and best practices
- [Development Workflow](Development-Workflow) - API development guidelines
