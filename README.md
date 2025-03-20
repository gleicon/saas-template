# SaaS Template

A modern SaaS template built with Next.js, TypeScript, and Tailwind CSS. This template includes user management, authentication, payment integration, and a beautiful landing page.

## Features

- 🚀 Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔐 Authentication with Better Auth
- 💳 Payment integration with Stripe
- 📊 User dashboard
- 🎯 Landing page
- 📱 Responsive design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Authentication
BETTER_AUTH_API_KEY=your_better_auth_api_key

# Database
DATABASE_URL=your_database_url

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable components
├── lib/                 # Utility functions and configurations
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## License

MIT
