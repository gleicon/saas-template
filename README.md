# SaaS Template

A modern SaaS template built with Next.js, TypeScript, and Tailwind CSS. This template includes user management, authentication, payment integration, and a beautiful landing page.

## Table of Contents

- [SaaS Template](#saas-template)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
    - [Running Locally](#running-locally)
      - [Option 1: Without Docker (Recommended for development)](#option-1-without-docker-recommended-for-development)
      - [Option 2: With Docker](#option-2-with-docker)
    - [Development Tips](#development-tips)
  - [Features](#features)
  - [Payment Providers](#payment-providers)
    - [Stripe](#stripe)
    - [Razorpay](#razorpay)
    - [PayPal](#paypal)
  - [Integrations](#integrations)
    - [Email Service](#email-service)
    - [File Storage](#file-storage)
    - [Analytics](#analytics)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
    - [Using the Setup Script (Recommended)](#using-the-setup-script-recommended)
    - [Manual Setup](#manual-setup)
    - [Docker Deployment](#docker-deployment)
  - [Creating Your Own SaaS Product](#creating-your-own-saas-product)
    - [1. Fork and Customize](#1-fork-and-customize)
    - [2. Configure Services](#2-configure-services)
    - [3. Deploy Your SaaS](#3-deploy-your-saas)
    - [4. Customize Features](#4-customize-features)
    - [5. Development Workflow](#5-development-workflow)
    - [6. Monitoring and Analytics](#6-monitoring-and-analytics)
    - [7. Security Considerations](#7-security-considerations)
  - [Authentication Setup](#authentication-setup)
    - [Google OAuth Setup](#google-oauth-setup)
    - [Email Setup](#email-setup)
      - [1. Resend (Recommended for simplicity)](#1-resend-recommended-for-simplicity)
      - [2. SendGrid](#2-sendgrid)
      - [3. Amazon SES](#3-amazon-ses)
      - [4. SMTP Server](#4-smtp-server)
      - [5. PostMark](#5-postmark)
      - [6. Mailgun](#6-mailgun)
    - [Cost Comparison for Email Services](#cost-comparison-for-email-services)
  - [Two-Factor Authentication (2FA)](#two-factor-authentication-2fa)
  - [Email Verification](#email-verification)
  - [Stripe Setup](#stripe-setup)
  - [User Account Creation](#user-account-creation)
  - [Product Provisioning](#product-provisioning)
  - [Managing Your Subscription](#managing-your-subscription)
  - [Development](#development)
    - [Project Structure](#project-structure)
    - [Available Scripts](#available-scripts)
  - [Development Tools \& CI/CD](#development-tools--cicd)
    - [GitHub Actions Workflows](#github-actions-workflows)
    - [Development Tools](#development-tools)
    - [Development Commands](#development-commands)
  - [Contributing](#contributing)
  - [License](#license)
  - [Deployment Options](#deployment-options)
    - [1. Vercel (Recommended for Next.js)](#1-vercel-recommended-for-nextjs)
    - [2. DigitalOcean App Platform](#2-digitalocean-app-platform)
    - [3. Google Cloud Run](#3-google-cloud-run)
    - [4. AWS Elastic Beanstalk](#4-aws-elastic-beanstalk)
    - [Cost Comparison](#cost-comparison)
    - [Database Options](#database-options)
    - [Monitoring and Logging](#monitoring-and-logging)
  - [Troubleshooting Guide](#troubleshooting-guide)
    - [Common Deployment Issues](#common-deployment-issues)
      - [1. Database Connection Issues](#1-database-connection-issues)
      - [2. Authentication Problems](#2-authentication-problems)
      - [3. Payment Integration Issues](#3-payment-integration-issues)
      - [4. Build and Deployment Issues](#4-build-and-deployment-issues)
      - [5. Performance Issues](#5-performance-issues)
      - [6. Environment-Specific Issues](#6-environment-specific-issues)
    - [Getting Help](#getting-help)
  - [Scaling and Load Balancing](#scaling-and-load-balancing)
    - [Horizontal Scaling](#horizontal-scaling)
    - [Caching Strategy](#caching-strategy)
    - [Database Scaling](#database-scaling)
    - [Performance Optimization](#performance-optimization)
    - [Monitoring and Alerts](#monitoring-and-alerts)
    - [Auto-scaling Configuration](#auto-scaling-configuration)
    - [Disaster Recovery](#disaster-recovery)

## Quick Start

The easiest way to create your own SaaS project is to use the setup script:

```bash
# Clone the template
git clone https://github.com/gleicon/saas-template.git
cd saas-template

# Install dependencies
npm install

# Run the setup script
npm run setup
```

The setup script will:
1. Ask for your project details (name, description, author, etc.)
2. Let you choose your payment provider
3. Select which integrations you want to enable
4. Create a new directory with your project name
5. Copy all template files
6. Update project configuration
7. Install dependencies
8. Initialize git repository
9. Set up initial commit

After the setup is complete, follow the instructions in the terminal to start development.

### Running Locally

#### Option 1: Without Docker (Recommended for development)

1. Navigate to your project directory:
   ```bash
   cd your-project-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables in `.env.local`:
   ```env
   # Authentication
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Database
   DATABASE_URL=your_postgresql_database_url

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # Next Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Visit `http://localhost:3000` in your browser.

#### Option 2: With Docker

1. Navigate to your project directory:
   ```bash
   cd your-project-name
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Configure your environment variables in `.env.local` (same as above)

4. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

5. In a new terminal, run database migrations:
   ```bash
   docker-compose exec app npx prisma generate
   docker-compose exec app npx prisma db push
   ```

6. Visit `http://localhost:3000` in your browser.

### Development Tips

- The development server includes hot reloading for instant feedback
- Use `npm run lint` to check for code style issues
- Run `npm run prisma:studio` to open Prisma's database management UI
- Use `npm run build` to test production builds locally

[↑ Back to top](#table-of-contents)

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔐 Authentication with NextAuth.js
  - Email/Password authentication
  - Google OAuth integration
  - Password reset functionality
  - Email verification
  - Two-factor authentication (2FA)
  - Session management
- 💳 Payment integration with Stripe
- 📊 User dashboard
- 🎯 Landing page
- 📱 Responsive design
- 🐳 Docker support

[↑ Back to top](#table-of-contents)

## Payment Providers

The template supports multiple payment providers to accommodate different regions and requirements:

### Stripe
- Global payment processing
- Supports most countries
- Comprehensive API and documentation
- Best for: US, EU, and most developed markets

### Razorpay
- Popular in India and Southeast Asia
- Local payment methods support
- Competitive pricing
- Best for: Indian and Southeast Asian markets

### PayPal
- Global payment processing
- Trusted by users worldwide
- Supports multiple currencies
- Best for: International transactions

[↑ Back to top](#table-of-contents)

## Integrations

The template includes several optional integrations that you can enable during setup:

### Email Service
- **Resend**: Modern email API with great deliverability
- **SendGrid**: Popular email service with extensive features
- **Amazon SES**: Cost-effective for high volume
- **SMTP**: Use your own SMTP server
- **PostMark**: Great for transactional emails
- **Mailgun**: Developer-friendly email service

### File Storage
- **AWS S3**: Amazon S3 for file storage
- **Cloudinary**: Cloud-based image and video management

### Analytics
- **Google Analytics**: Google Analytics 4 integration
- **Plausible Analytics**: Privacy-focused analytics

[↑ Back to top](#table-of-contents)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later
- npm or yarn
- PostgreSQL database
- Stripe account
- Google OAuth credentials (for social login)
- Resend account (for email)
- Docker and Docker Compose (for containerized deployment)

[↑ Back to top](#table-of-contents)

## Getting Started

### Using the Setup Script (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/gleicon/saas-template.git
   cd saas-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the setup script:
   ```bash
   npm run setup
   ```

4. Follow the prompts to configure your project:
   - Project name
   - Description
   - Author name
   - Author email
   - Domain

5. The script will create a new directory with your project name and set everything up.

6. Follow the instructions in the terminal to start development.

### Manual Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/gleicon/saas-template.git
   cd saas-template
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Configure your environment variables in `.env.local`:
   ```env
   # Authentication
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Database
   DATABASE_URL=your_postgresql_database_url

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # Next Auth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   ```

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Visit `http://localhost:3000` in your browser.

### Docker Deployment

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Run database migrations:
   ```bash
   docker-compose exec app npx prisma generate
   docker-compose exec app npx prisma db push
   ```

3. Visit `http://localhost:3000` in your browser.

[↑ Back to top](#table-of-contents)

## Creating Your Own SaaS Product

### 1. Fork and Customize

1. Fork this repository to your GitHub account
2. Clone your forked repository:
   ```bash
   git clone https://github.com/gleicon/your-saas-name.git
   cd your-saas-name
   ```

3. Update project information:
   - Edit `package.json`:
     ```json
     {
       "name": "your-saas-name",
       "version": "1.0.0",
       "description": "Your SaaS description",
       "author": "Your Name",
       "license": "MIT"
     }
     ```
   - Update `README.md` with your project details
   - Modify `src/app/layout.tsx` with your brand name and metadata

4. Customize the landing page:
   - Edit `src/app/page.tsx` with your product information
   - Update pricing plans in `src/lib/stripe.ts`
   - Modify the design in `src/styles/globals.css`

5. Set up your domain:
   - Purchase a domain name
   - Configure DNS settings
   - Update environment variables with your domain

### 2. Configure Services

1. Set up Stripe:
   - Create a new Stripe account
   - Update products and prices in Stripe Dashboard
   - Update price IDs in `src/lib/stripe.ts`
   - Configure webhook endpoints

2. Configure Google OAuth:
   - Create a new project in Google Cloud Console
   - Add your domain to authorized domains
   - Update OAuth credentials

3. Set up email service:
   - Create Resend account
   - Verify your domain
   - Update email templates in `src/lib/email.ts`

### 3. Deploy Your SaaS

1. Choose a hosting provider:
   - Vercel (recommended for Next.js)
   - DigitalOcean
   - AWS
   - Google Cloud

2. Set up your database:
   - Use managed PostgreSQL service
   - Update DATABASE_URL in production

3. Configure environment variables:
   ```env
   NEXTAUTH_URL=https://your-domain.com
   DATABASE_URL=your_production_database_url
   STRIPE_SECRET_KEY=your_stripe_secret_key
   # ... other variables
   ```

4. Deploy using Docker:
   ```bash
   # Build the image
   docker build -t your-saas-name .

   # Run with Docker Compose
   docker-compose -f docker-compose.prod.yml up -d
   ```

### 4. Customize Features

1. Modify the user model:
   ```prisma
   // prisma/schema.prisma
   model User {
     // Add custom fields
     companyName String?
     role        String?
     // ... other fields
   }
   ```

2. Update subscription plans:
   ```typescript
   // src/lib/stripe.ts
   export const plans = [
     {
       name: "Free",
       price: 0,
       features: ["Feature 1", "Feature 2"],
     },
     {
       name: "Pro",
       price: 29,
       features: ["All Free features", "Pro Feature 1"],
     },
     // ... your plans
   ];
   ```

3. Add custom API routes:
   ```typescript
   // src/app/api/your-feature/route.ts
   export async function POST(req: Request) {
     // Your custom logic
   }
   ```

### 5. Development Workflow

1. Create a development branch:
   ```bash
   git checkout -b develop
   ```

2. Set up CI/CD:
   - Configure GitHub Actions
   - Set up automated testing
   - Enable automated deployments

3. Development workflow:
   ```bash
   # Create feature branch
   git checkout -b feature/your-feature

   # Make changes
   git add .
   git commit -m "Add your feature"

   # Push changes
   git push origin feature/your-feature

   # Create pull request
   ```

### 6. Monitoring and Analytics

1. Set up monitoring:
   - Configure error tracking (e.g., Sentry)
   - Set up performance monitoring
   - Enable logging

2. Add analytics:
   - Google Analytics
   - Custom event tracking
   - User behavior analysis

### 7. Security Considerations

1. Regular updates:
   ```bash
   # Update dependencies
   npm update

   # Check for vulnerabilities
   npm audit
   ```

2. Security best practices:
   - Enable rate limiting
   - Implement CORS policies
   - Regular security audits

[↑ Back to top](#table-of-contents)

## Authentication Setup

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth Client ID
5. Set up the OAuth consent screen
6. Create Web Application credentials
7. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
8. Copy the Client ID and Client Secret to your `.env.local` file

### Email Setup

Choose one of the following email providers:

#### 1. Resend (Recommended for simplicity)
1. Create an account at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add to your `.env.local`:
   ```env
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=your_resend_api_key
   ```

#### 2. SendGrid
1. Create an account at [SendGrid](https://sendgrid.com)
2. Create an API key with "Mail Send" permissions
3. Add to your `.env.local`:
   ```env
   EMAIL_PROVIDER=sendgrid
   SENDGRID_API_KEY=your_sendgrid_api_key
   ```

#### 3. Amazon SES
1. Set up AWS account and configure SES
2. Create SMTP credentials
3. Add to your `.env.local`:
   ```env
   EMAIL_PROVIDER=ses
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   ```

#### 4. SMTP Server
1. Configure your SMTP server
2. Add to your `.env.local`:
   ```env
   EMAIL_PROVIDER=smtp
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASSWORD=your_smtp_password
   ```

#### 5. PostMark
1. Create an account at [PostMark](https://postmarkapp.com)
2. Get your server API token
3. Add to your `.env.local`:
   ```env
   EMAIL_PROVIDER=postmark
   POSTMARK_API_TOKEN=your_postmark_api_token
   ```

#### 6. Mailgun
1. Create an account at [Mailgun](https://mailgun.com)
2. Get your API key and domain
3. Add to your `.env.local`:
   ```env
   EMAIL_PROVIDER=mailgun
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   ```

### Cost Comparison for Email Services

1. **Resend**
   - Free tier: 100 emails/day
   - Pro: $20/month for 50,000 emails
   - Best for: Modern applications, great deliverability

2. **SendGrid**
   - Free tier: 100 emails/day
   - Pro: $14.95/month for 50,000 emails
   - Best for: High volume, extensive features

3. **Amazon SES**
   - Pay per use: $0.10 per 1,000 emails
   - Free tier: 62,000 emails/month
   - Best for: Cost-effective high volume

4. **PostMark**
   - Free trial: 100 emails
   - Pro: $15/month for 10,000 emails
   - Best for: Transactional emails

5. **Mailgun**
   - Free trial: 3 months
   - Pro: $35/month for 50,000 emails
   - Best for: Developer-friendly features

6. **SMTP Server**
   - Cost varies by provider
   - Self-hosted options available
   - Best for: Complete control

[↑ Back to top](#table-of-contents)

## Two-Factor Authentication (2FA)

1. Log in to your account
2. Go to Settings → Security
3. Click "Enable 2FA"
4. Scan the QR code with your authenticator app
5. Enter the code from your authenticator app
6. Save your backup codes securely

[↑ Back to top](#table-of-contents)

## Email Verification

1. Register a new account
2. Check your email for the verification link
3. Click the link to verify your email
4. You can now log in with your verified account

[↑ Back to top](#table-of-contents)

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)

2. Get your API keys from the Stripe Dashboard:
   - Go to Developers → API keys
   - Copy your Secret key and Publishable key
   - Add them to your `.env.local` file

3. Create your products in Stripe:
   - Go to Products → Add Product
   - Create three products matching the plans in `src/lib/stripe.ts`:
     - Free Plan (price: $0)
     - Pro Plan (price: $29/month)
     - Enterprise Plan (price: $99/month)
   - Copy the price IDs and update them in `src/lib/stripe.ts`

4. Set up Stripe webhook:
   - Go to Developers → Webhooks
   - Add endpoint: `http://localhost:3000/api/webhooks/stripe`
   - Select events to listen to:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy the webhook signing secret to your `.env.local` file

[↑ Back to top](#table-of-contents)

## User Account Creation

1. Visit the registration page at `/register`
2. Fill in your details:
   - Name
   - Email
   - Password
3. Click "Create Account"
4. Verify your email
5. Log in to your account

[↑ Back to top](#table-of-contents)

## Product Provisioning

After creating a user account, follow these steps to provision the product:

1. Log in to your account
2. Go to the Pricing page
3. Select a plan:
   - Free Plan: No payment required
   - Pro Plan: $29/month
   - Enterprise Plan: $99/month

4. For paid plans:
   - Click "Start Free Trial"
   - Enter your payment details
   - Complete the Stripe checkout process

5. After successful subscription:
   - You'll be redirected to the dashboard
   - Your subscription status will be updated
   - You'll have access to plan-specific features

[↑ Back to top](#table-of-contents)

## Managing Your Subscription

1. Go to Settings → Subscription
2. You can:
   - View your current plan
   - Change your plan
   - Update billing information
   - Cancel your subscription

[↑ Back to top](#table-of-contents)

## Development

### Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable components
├── lib/                 # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database

[↑ Back to top](#table-of-contents)

## Development Tools & CI/CD

### GitHub Actions Workflows

1. **Main CI Pipeline** (`.github/workflows/ci.yml`):
   ```yaml
   name: CI
   
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     test:
       runs-on: ubuntu-latest
       
       services:
         postgres:
           image: postgres:14
           env:
             POSTGRES_USER: postgres
             POSTGRES_PASSWORD: postgres
             POSTGRES_DB: test_db
           ports:
             - 5432:5432
           options: >-
             --health-cmd pg_isready
             --health-interval 10s
             --health-timeout 5s
             --health-retries 5
   
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Generate Prisma Client
           run: npx prisma generate
         
         - name: Run linting
           run: npm run lint
         
         - name: Run type checking
           run: npm run type-check
         
         - name: Run tests
           run: npm test
           env:
             DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
             NEXTAUTH_SECRET: test_secret
             NEXTAUTH_URL: http://localhost:3000
   ```

2. **Release Workflow** (`.github/workflows/release.yml`):
   ```yaml
   name: Release
   
   on:
     push:
       tags:
         - 'v*'
   
   jobs:
     release:
       runs-on: ubuntu-latest
       
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Create Release
           uses: softprops/action-gh-release@v1
           with:
             files: |
               dist/*.zip
               dist/*.tar.gz
           env:
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

3. **Dependency Updates** (`.github/workflows/dependencies.yml`):
   ```yaml
   name: Dependencies
   
   on:
     schedule:
       - cron: '0 0 * * 0'  # Run weekly
   
   jobs:
     update:
       runs-on: ubuntu-latest
       
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Update dependencies
           run: npm update
         
         - name: Create Pull Request
           uses: peter-evans/create-pull-request@v5
           with:
             commit-message: 'chore: update dependencies'
             title: 'chore: update dependencies'
             body: 'Automated dependency updates'
   ```

### Development Tools

1. **Code Quality Tools**:
   ```json
   // package.json
   {
     "scripts": {
       "lint": "eslint . --ext .ts,.tsx",
       "format": "prettier --write \"**/*.{ts,tsx,md}\"",
       "type-check": "tsc --noEmit",
       "test": "jest",
       "test:watch": "jest --watch",
       "test:coverage": "jest --coverage",
       "prepare": "husky install"
     },
     "devDependencies": {
       "@types/jest": "^29.5.0",
       "@typescript-eslint/eslint-plugin": "^5.59.0",
       "@typescript-eslint/parser": "^5.59.0",
       "eslint": "^8.38.0",
       "eslint-config-next": "^13.3.0",
       "eslint-config-prettier": "^8.8.0",
       "eslint-plugin-react": "^7.32.2",
       "eslint-plugin-react-hooks": "^4.6.0",
       "husky": "^8.0.3",
       "jest": "^29.5.0",
       "jest-environment-jsdom": "^29.5.0",
       "lint-staged": "^13.2.0",
       "prettier": "^2.8.7",
       "ts-jest": "^29.1.0",
       "typescript": "^5.0.4"
     }
   }
   ```

2. **Git Hooks** (`.husky/pre-commit`):
   ```bash
   #!/bin/sh
   . "$(dirname "$0")/_/husky.sh"
   
   npm run lint
   npm run type-check
   npm run test
   ```

3. **VS Code Extensions**:
   ```json
   // .vscode/extensions.json
   {
     "recommendations": [
       "dbaeumer.vscode-eslint",
       "esbenp.prettier-vscode",
       "ms-vscode.vscode-typescript-next",
       "bradlc.vscode-tailwindcss",
       "prisma.prisma",
       "ms-azuretools.vscode-docker",
       "eamodio.gitlens",
       "streetsidesoftware.code-spell-checker"
     ]
   }
   ```

4. **VS Code Settings**:
   ```json
   // .vscode/settings.json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true,
     "tailwindCSS.experimental.classRegex": [
       ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
       ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
     ],
     "files.associations": {
       "*.css": "tailwindcss"
     }
   }
   ```

5. **Testing Setup** (`jest.config.js`):
   ```javascript
   const nextJest = require('next/jest')
   
   const createJestConfig = nextJest({
     dir: './',
   })
   
   const customJestConfig = {
     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
     testEnvironment: 'jest-environment-jsdom',
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/src/$1',
     },
     collectCoverageFrom: [
       'src/**/*.{js,jsx,ts,tsx}',
       '!src/**/*.d.ts',
       '!src/**/*.stories.{js,jsx,ts,tsx}',
       '!src/**/*.test.{js,jsx,ts,tsx}',
     ],
   }
   
   module.exports = createJestConfig(customJestConfig)
   ```

6. **ESLint Configuration** (`.eslintrc.js`):
   ```javascript
   module.exports = {
     extends: [
       'next/core-web-vitals',
       'plugin:@typescript-eslint/recommended',
       'plugin:react/recommended',
       'plugin:react-hooks/recommended',
       'prettier',
     ],
     plugins: ['@typescript-eslint', 'react', 'react-hooks'],
     rules: {
       'react/react-in-jsx-scope': 'off',
       'react/prop-types': 'off',
       '@typescript-eslint/explicit-module-boundary-types': 'off',
       '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
     },
     settings: {
       react: {
         version: 'detect',
       },
     },
   }
   ```

7. **Prettier Configuration** (`.prettierrc`):
   ```json
   {
     "semi": true,
     "trailingComma": "es5",
     "singleQuote": true,
     "tabWidth": 2,
     "useTabs": false,
     "printWidth": 100
   }
   ```

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Lint and format code
npm run lint
npm run format

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

[↑ Back to top](#table-of-contents)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

[↑ Back to top](#table-of-contents)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[↑ Back to top](#table-of-contents)

## Deployment Options

### 1. Vercel (Recommended for Next.js)

Vercel is the creator of Next.js and provides the best integration and performance.

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Create a `vercel.json` configuration:
   ```json
   {
     "version": 2,
     "buildCommand": "npm run build",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": "nextjs",
     "regions": ["iad1"],
     "env": {
       "NEXTAUTH_URL": "https://your-domain.com",
       "DATABASE_URL": "your_database_url",
       "STRIPE_SECRET_KEY": "your_stripe_secret_key",
       "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY": "your_stripe_publishable_key",
       "STRIPE_WEBHOOK_SECRET": "your_stripe_webhook_secret",
       "GOOGLE_CLIENT_ID": "your_google_client_id",
       "GOOGLE_CLIENT_SECRET": "your_google_client_secret",
       "RESEND_API_KEY": "your_resend_api_key"
     }
   }
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set up automatic deployments:
   - Connect your GitHub repository
   - Configure branch deployments
   - Set up preview deployments for PRs

### 2. DigitalOcean App Platform

DigitalOcean App Platform provides a simple way to deploy with managed databases.

1. Create a `do.yaml` configuration:
   ```yaml
   name: your-saas-app
   services:
   - name: web
     github:
       branch: main
       deploy_on_push: true
       repo: gleicon/your-saas-app
     build_command: npm run build
     run_command: npm start
     envs:
     - key: NEXTAUTH_URL
       value: https://your-domain.com
     - key: DATABASE_URL
       value: ${db.DATABASE_URL}
     - key: STRIPE_SECRET_KEY
       value: your_stripe_secret_key
     - key: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
       value: your_stripe_publishable_key
     - key: STRIPE_WEBHOOK_SECRET
       value: your_stripe_webhook_secret
     - key: GOOGLE_CLIENT_ID
       value: your_google_client_id
     - key: GOOGLE_CLIENT_SECRET
       value: your_google_client_secret
     - key: RESEND_API_KEY
       value: your_resend_api_key
   databases:
   - engine: PG
     name: db
     production: false
   ```

2. Deploy using DigitalOcean CLI:
   ```bash
   # Install doctl
   brew install doctl

   # Authenticate
   doctl auth init

   # Create app
   doctl apps create --spec do.yaml
   ```

3. Set up automatic deployments:
   - Connect your GitHub repository
   - Configure branch deployments
   - Set up preview deployments for PRs

### 3. Google Cloud Run

Google Cloud Run is a serverless platform that scales to zero when not in use.

1. Create a `Dockerfile`:
   ```dockerfile
   FROM node:18-alpine AS base
   FROM base AS deps
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   ENV NEXT_TELEMETRY_DISABLED 1
   RUN npm run build
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   ENV NEXT_TELEMETRY_DISABLED 1
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   ENV HOSTNAME "0.0.0.0"
   CMD ["node", "server.js"]
   ```

2. Update `next.config.js`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'standalone',
     // ... other config
   }
   ```

3. Deploy using Google Cloud CLI:
   ```bash
   # Install gcloud CLI
   brew install google-cloud-sdk

   # Initialize project
   gcloud init

   # Build and deploy
   gcloud builds submit --tag gcr.io/your-project/your-saas-app
   gcloud run deploy your-saas-app \
     --image gcr.io/your-project/your-saas-app \
     --platform managed \
     --region your-region \
     --allow-unauthenticated \
     --set-env-vars="NEXTAUTH_URL=https://your-domain.com,DATABASE_URL=your_database_url"
   ```

### 4. AWS Elastic Beanstalk

AWS Elastic Beanstalk provides easy deployment with managed infrastructure.

1. Create `.ebextensions/01_environment.config`:
   ```yaml
   option_settings:
     aws:elasticbeanstalk:application:environment:
       NEXTAUTH_URL: https://your-domain.com
       DATABASE_URL: your_database_url
       STRIPE_SECRET_KEY: your_stripe_secret_key
       NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: your_stripe_publishable_key
       STRIPE_WEBHOOK_SECRET: your_stripe_webhook_secret
       GOOGLE_CLIENT_ID: your_google_client_id
       GOOGLE_CLIENT_SECRET: your_google_client_secret
       RESEND_API_KEY: your_resend_api_key
   ```

2. Create `.ebextensions/02_nodecommand.config`:
   ```yaml
   option_settings:
     aws:elasticbeanstalk:container:nodejs:
       NodeCommand: "npm start"
   ```

3. Deploy using AWS CLI:
   ```bash
   # Install AWS CLI
   brew install awscli

   # Configure AWS
   aws configure

   # Initialize EB
   eb init your-saas-app

   # Create environment
   eb create production
   ```

### Cost Comparison

1. **Vercel**
   - Free tier: 100GB bandwidth, unlimited personal projects
   - Pro: $20/month for team features
   - Enterprise: Custom pricing
   - Best for: Personal projects and small teams

2. **DigitalOcean App Platform**
   - Free tier: 3 static sites, 2 apps
   - Basic: $5/month for 1GB RAM
   - Pro: $12/month for 2GB RAM
   - Best for: Small to medium businesses

3. **Google Cloud Run**
   - Free tier: 2 million requests/month
   - Pay per use: $0.00002400/vCPU-second
   - Best for: Variable traffic, cost optimization

4. **AWS Elastic Beanstalk**
   - Free tier: 750 hours/month
   - Pay per use: EC2 instance costs
   - Best for: Enterprise applications

### Database Options

1. **Managed PostgreSQL Services**:
   - DigitalOcean Managed Databases: $15/month
   - Google Cloud SQL: $9.03/month
   - AWS RDS: $13/month
   - Supabase: Free tier available

2. **Serverless Databases**:
   - Neon: Free tier available
   - PlanetScale: Free tier available
   - CockroachDB: Free tier available

### Monitoring and Logging

1. **Application Monitoring**:
   - Vercel Analytics (included)
   - DigitalOcean Monitoring ($5/month)
   - Google Cloud Monitoring (included)
   - AWS CloudWatch (included)

2. **Error Tracking**:
   - Sentry: Free tier available
   - LogRocket: $99/month
   - DataDog: $15/month

[↑ Back to top](#table-of-contents)

## Troubleshooting Guide

### Common Deployment Issues

#### 1. Database Connection Issues

**Symptoms:**
- "Database connection failed" errors
- Prisma connection errors
- Timeout errors

**Solutions:**
1. Check database URL format:
   ```env
   # Correct format
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

2. Verify database credentials:
   ```bash
   # Test connection
   psql "postgresql://user:password@host:port/database"
   ```

3. Check firewall rules:
   - Ensure database port (5432) is open
   - Verify IP whitelist settings
   - Check VPC/network configurations

4. Common fixes:
   ```bash
   # Reset Prisma client
   npx prisma generate
   
   # Verify database schema
   npx prisma db push
   ```

#### 2. Authentication Problems

**Symptoms:**
- Login failures
- OAuth redirect errors
- Session issues

**Solutions:**
1. Verify environment variables:
   ```env
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

2. Check OAuth configuration:
   - Verify redirect URIs in Google Console
   - Ensure domain is authorized
   - Check OAuth consent screen settings

3. Common fixes:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Rebuild application
   npm run build
   ```

#### 3. Payment Integration Issues

**Symptoms:**
- Payment processing failures
- Webhook errors
- Subscription status mismatches

**Solutions:**
1. Verify Stripe configuration:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

2. Check webhook setup:
   - Verify webhook endpoint URL
   - Check webhook events in Stripe dashboard
   - Test webhook locally using Stripe CLI

3. Common fixes:
   ```bash
   # Test webhook locally
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   
   # Verify Stripe CLI installation
   stripe --version
   ```

#### 4. Build and Deployment Issues

**Symptoms:**
- Build failures
- Deployment timeouts
- Missing dependencies

**Solutions:**
1. Check Node.js version:
   ```bash
   # Verify Node.js version
   node -v  # Should be 18.x or later
   ```

2. Clear build cache:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules
   npm install
   ```

3. Verify build output:
   ```bash
   # Run build locally
   npm run build
   
   # Check build logs
   cat .next/server/pages-manifest.json
   ```

#### 5. Performance Issues

**Symptoms:**
- Slow page loads
- High server load
- Memory leaks

**Solutions:**
1. Enable caching:
   ```javascript
   // next.config.js
   module.exports = {
     experimental: {
       optimizeCss: true,
       optimizeImages: true,
     },
     // ... other config
   }
   ```

2. Implement rate limiting:
   ```typescript
   // src/middleware.ts
   import rateLimit from 'express-rate-limit'
   
   export const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   })
   ```

3. Monitor performance:
   ```bash
   # Install monitoring tools
   npm install @vercel/analytics
   
   # Add to _app.tsx
   import { Analytics } from '@vercel/analytics/react'
   ```

#### 6. Environment-Specific Issues

**Vercel:**
1. Check build logs in Vercel dashboard
2. Verify environment variables
3. Check deployment settings

**DigitalOcean:**
1. Verify app spec configuration
2. Check resource limits
3. Monitor app logs

**Google Cloud Run:**
1. Check container logs
2. Verify service account permissions
3. Monitor resource usage

**AWS Elastic Beanstalk:**
1. Check EB logs
2. Verify instance health
3. Monitor CloudWatch metrics

### Getting Help

1. **Check Logs:**
   ```bash
   # Application logs
   npm run dev > app.log 2>&1
   
   # Database logs
   tail -f /var/log/postgresql/postgresql-*.log
   ```

2. **Debug Mode:**
   ```bash
   # Enable debug logging
   DEBUG=* npm run dev
   ```

3. **Community Support:**
   - GitHub Issues
   - Stack Overflow
   - Discord community

4. **Professional Support:**
   - Hire a consultant
   - Contact platform support
   - Use managed services

[↑ Back to top](#table-of-contents)

## Scaling and Load Balancing

### Horizontal Scaling

1. **Container Orchestration**
   ```yaml
   # docker-compose.scale.yml
   version: '3.8'
   services:
     app:
       deploy:
         replicas: 3
         resources:
           limits:
             cpus: '1'
             memory: 1G
           reservations:
             cpus: '0.5'
             memory: 512M
       environment:
         - NODE_ENV=production
         - DATABASE_URL=${DATABASE_URL}
         - REDIS_URL=${REDIS_URL}
     nginx:
       image: nginx:alpine
       ports:
         - "80:80"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf:ro
     redis:
       image: redis:alpine
       volumes:
         - redis_data:/data
   volumes:
     redis_data:
   ```

2. **Load Balancer Configuration**
   ```nginx
   # nginx.conf
   events {
     worker_connections 1024;
   }

   http {
     upstream app_servers {
       least_conn;  # Load balancing algorithm
       server app:3000;
       server app:3000;
       server app:3000;
     }

     server {
       listen 80;
       server_name your-domain.com;

       location / {
         proxy_pass http://app_servers;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection 'upgrade';
         proxy_set_header Host $host;
         proxy_cache_bypass $http_upgrade;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header X-Forwarded-Proto $scheme;
       }
     }
   }
   ```

### Caching Strategy

1. **Redis Caching**
   ```typescript
   // src/lib/redis.ts
   import { Redis } from 'ioredis';

   const redis = new Redis(process.env.REDIS_URL);

   export async function cacheData(key: string, data: any, ttl: number = 3600) {
     await redis.setex(key, ttl, JSON.stringify(data));
   }

   export async function getCachedData(key: string) {
     const data = await redis.get(key);
     return data ? JSON.parse(data) : null;
   }
   ```

2. **API Response Caching**
   ```typescript
   // src/app/api/products/route.ts
   import { cacheData, getCachedData } from '@/lib/redis';

   export async function GET() {
     const cacheKey = 'products';
     const cachedProducts = await getCachedData(cacheKey);
     
     if (cachedProducts) {
       return Response.json(cachedProducts);
     }

     const products = await prisma.product.findMany();
     await cacheData(cacheKey, products);
     
     return Response.json(products);
   }
   ```

### Database Scaling

1. **Read Replicas**
   ```env
   # Primary database
   DATABASE_URL=postgresql://user:password@primary-db:5432/dbname
   
   # Read replicas
   DATABASE_REPLICA_URL=postgresql://user:password@replica-db:5432/dbname
   ```

2. **Connection Pooling**
   ```typescript
   // src/lib/db.ts
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL
       }
     },
     connectionLimit: 20,
     pool: {
       min: 2,
       max: 10
     }
   });
   ```

### Performance Optimization

1. **CDN Configuration**
   ```typescript
   // next.config.js
   module.exports = {
     images: {
       domains: ['your-cdn-domain.com'],
       formats: ['image/avif', 'image/webp'],
       minimumCacheTTL: 60,
     },
     async headers() {
       return [
         {
           source: '/:all*(svg|jpg|png)',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable',
             },
           ],
         },
       ];
     },
   };
   ```

2. **API Rate Limiting**
   ```typescript
   // src/middleware.ts
   import rateLimit from 'express-rate-limit';
   import RedisStore from 'rate-limit-redis';
   import { redis } from '@/lib/redis';

   export const apiLimiter = rateLimit({
     store: new RedisStore({
       client: redis,
       prefix: 'rate-limit:',
     }),
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: 'Too many requests from this IP, please try again later.',
   });
   ```

### Monitoring and Alerts

1. **Health Checks**
   ```typescript
   // src/app/api/health/route.ts
   export async function GET() {
     try {
       // Check database connection
       await prisma.$queryRaw`SELECT 1`;
       
       // Check Redis connection
       await redis.ping();
       
       return Response.json({ status: 'healthy' });
     } catch (error) {
       return Response.json(
         { status: 'unhealthy', error: error.message },
         { status: 500 }
       );
     }
   }
   ```

2. **Resource Monitoring**
   ```typescript
   // src/lib/monitoring.ts
   import { metrics } from '@opentelemetry/api';

   const meter = metrics.getMeter('saas-app');

   // Create metrics
   const requestCounter = meter.createCounter('http_requests_total', {
     description: 'Total number of HTTP requests',
   });

   const responseTime = meter.createHistogram('http_response_time_seconds', {
     description: 'HTTP response time in seconds',
   });

   // Record metrics
   export function recordMetrics(req: Request, res: Response) {
     requestCounter.add(1);
     const start = Date.now();
     res.on('finish', () => {
       responseTime.record((Date.now() - start) / 1000);
     });
   }
   ```

### Auto-scaling Configuration

1. **Kubernetes HPA**
   ```yaml
   # hpa.yaml
   apiVersion: autoscaling/v2
   kind: HorizontalPodAutoscaler
   metadata:
     name: saas-app
   spec:
     scaleTargetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: saas-app
     minReplicas: 2
     maxReplicas: 10
     metrics:
     - type: Resource
       resource:
         name: cpu
         target:
           type: Utilization
           averageUtilization: 70
     - type: Resource
       resource:
         name: memory
         target:
           type: Utilization
           averageUtilization: 80
   ```

2. **Cloud Provider Auto-scaling**
   ```yaml
   # digitalocean.yaml
   name: saas-app
   services:
   - name: web
     auto_scaling:
       min_instances: 2
       max_instances: 10
       metrics:
       - type: cpu_utilization
         target_value: 70
   ```

### Disaster Recovery

1. **Database Backups**
   ```bash
   # backup.sh
   #!/bin/bash
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backups"
   
   # Create backup
   pg_dump $DATABASE_URL > "$BACKUP_DIR/backup_$TIMESTAMP.sql"
   
   # Upload to S3
   aws s3 cp "$BACKUP_DIR/backup_$TIMESTAMP.sql" "s3://your-bucket/backups/"
   
   # Cleanup old backups
   find $BACKUP_DIR -type f -mtime +7 -delete
   ```

2. **Failover Configuration**
   ```typescript
   // src/lib/db.ts
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient({
     datasources: {
       db: {
         url: process.env.DATABASE_URL
       }
     },
     connectionTimeoutMillis: 5000,
     retry: {
       max: 3,
       backoff: {
         initial: 1000,
         max: 5000,
         factor: 2,
       },
     },
   });
   ```

[↑ Back to top](#table-of-contents)
