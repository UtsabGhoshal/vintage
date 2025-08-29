# Neon Database Setup Guide

## 🚀 Quick Setup

### Step 1: Connect to Neon
1. Click [Connect to Neon](#open-mcp-popover) to access Neon integration
2. Follow the MCP setup to create or connect to your Neon database
3. Copy your database connection string

### Step 2: Update Environment Variable
Once you have your Neon connection string, update the `DATABASE_URL`:

```bash
# Your connection string will look like this:
postgresql://username:password@hostname.neon.tech/dbname?sslmode=require
```

Use the DevServerControl tool to set it:
```
DATABASE_URL: "your-actual-neon-connection-string"
```

### Step 3: Restart Server
The server will automatically:
- Create the `users` table if it doesn't exist
- Set up proper indexes and constraints
- Initialize the authentication system

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('collaborator', 'guest')) NOT NULL DEFAULT 'guest',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)

### Admin (Collaborators Only)
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:userId/role` - Update user role
- `DELETE /api/admin/users/:userId` - Delete user

### Health Check
- `GET /api/health/db` - Check database connection

## 🧪 Testing the Setup

1. **Database Health**: Visit `/api/health/db` to verify connection
2. **Register**: Create a collaborator account through the UI
3. **Admin Access**: Use collaborator account to access admin endpoints

## 🛠 Database Service Methods

The `DatabaseService` class provides these methods:

```typescript
// User management
await databaseService.createUser(username, email, hashedPassword, role);
await databaseService.findUserByEmail(email);
await databaseService.findUserById(id);
await databaseService.userExists(email, username);

// Admin functions
await databaseService.getAllUsers();
await databaseService.updateUserRole(id, role);
await databaseService.deleteUser(id);

// Custom queries
await databaseService.query("SELECT * FROM users WHERE role = $1", ['collaborator']);
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- SQL injection prevention (parameterized queries)
- Input validation and sanitization

## 🚀 Next Steps

1. Connect your actual Neon database via MCP
2. Update the DATABASE_URL environment variable
3. Restart the development server
4. Test authentication and admin features
5. Customize the database schema for your specific needs

## 🆘 Troubleshooting

**Connection Issues**: 
- Verify your Neon connection string is correct
- Check if your Neon database is active
- Ensure the database name exists

**Authentication Issues**:
- Check JWT_SECRET is set
- Verify user table was created
- Check server logs for detailed errors

**Admin Access**:
- Ensure you're logged in as a 'collaborator'
- Check the JWT token is being sent correctly
- Verify the authenticateToken middleware is working
