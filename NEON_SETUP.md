# Neon Database Setup Guide

This guide will help you connect your Next.js application to a Neon PostgreSQL database.

## 🚀 Quick Start

### 1. Create a Neon Account and Database

1. Go to [Neon.tech](https://neon.tech) and sign up for a free account
2. Create a new project
3. Your database will be automatically created

### 2. Get Your Connection String

1. In your Neon dashboard, navigate to your project
2. Click on "Connection Details" or "Connect"
3. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-example-123456.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```

### 3. Configure Your Local Environment

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder with your actual Neon connection string:
   ```env
   DATABASE_URL="your-actual-neon-connection-string-here"
   ```

### 4. Install Dependencies (Already Done)

The Neon serverless driver is already installed:
```bash
npm install @neondatabase/serverless
```

### 5. Test Your Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

3. Click "Test Connection" to verify your database connection

4. Click "Initialize Database" to create example tables

## 📁 Project Structure

```
src/
├── lib/
│   └── db.ts                 # Database configuration and helper functions
├── app/
│   ├── api/
│   │   └── db/
│   │       ├── test/route.ts # API route to test database connection
│   │       └── init/route.ts # API route to initialize database tables
│   ├── dashboard/
│   │   └── page.tsx          # Database dashboard UI
│   └── page.tsx              # Updated homepage with Neon integration
├── .env.local                # Your database configuration (not in git)
└── .env.example              # Template for environment variables
```

## 🛠 Available Database Functions

The `src/lib/db.ts` file provides several helper functions:

- `testConnection()` - Test database connectivity
- `createTables()` - Initialize example tables (users, products)
- `getUsers()` - Fetch all users
- `getProducts()` - Fetch all products
- `createUser(email, name)` - Create a new user
- `createProduct(...)` - Create a new product

## 🔧 API Routes

- `GET /api/db/test` - Test database connection
- `POST /api/db/init` - Initialize database tables

## 📊 Dashboard Features

Visit `/dashboard` to access:

- **Connection Test**: Verify your Neon database connection
- **Database Initialization**: Create example tables
- **Configuration Instructions**: Step-by-step setup guide

## 🔒 Security Notes

- Never commit `.env.local` to version control (it's already in `.gitignore`)
- Use environment variables for all sensitive database credentials
- The Neon serverless driver automatically handles connection pooling and SSL

## 🚀 Deployment

When deploying to Vercel or other platforms:

1. Add your `DATABASE_URL` environment variable in your deployment platform's settings
2. The Neon serverless driver is optimized for serverless environments
3. No additional configuration needed!

## 📚 Next Steps

1. Customize the database schema in `src/lib/db.ts`
2. Add more API routes for your specific use case
3. Build your application features using the database functions
4. Explore [Neon's documentation](https://neon.tech/docs) for advanced features

## 🆘 Troubleshooting

### Connection Issues
- Verify your connection string is correct
- Ensure your Neon database is active (free tier databases may sleep)
- Check that your IP is allowed (Neon allows all IPs by default)

### Environment Variables
- Make sure `.env.local` exists and contains the correct `DATABASE_URL`
- Restart your development server after changing environment variables

### API Errors
- Check the browser console and terminal for detailed error messages
- Verify your database connection string format

## 📖 Resources

- [Neon Documentation](https://neon.tech/docs)
- [Neon Serverless Driver](https://github.com/neondatabase/serverless)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)