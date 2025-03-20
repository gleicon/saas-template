import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
});

export const plans = [
    {
        name: "Free",
        price: 0,
        features: [
            "Basic features",
            "Up to 5 projects",
            "Community support",
        ],
    },
    {
        name: "Pro",
        price: 29,
        features: [
            "All Free features",
            "Unlimited projects",
            "Priority support",
            "Advanced analytics",
        ],
    },
    {
        name: "Enterprise",
        price: 99,
        features: [
            "All Pro features",
            "Custom integrations",
            "Dedicated support",
            "Team management",
        ],
    },
]; 