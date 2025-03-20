import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
    const confirmLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: "SaaS Template <noreply@yourdomain.com>",
        to: email,
        subject: "Verify your email",
        html: `
      <h1>Verify your email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${confirmLink}">${confirmLink}</a>
      <p>This link will expire in 24 hours.</p>
    `,
    });
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    await resend.emails.send({
        from: "SaaS Template <noreply@yourdomain.com>",
        to: email,
        subject: "Reset your password",
        html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    });
}

export async function sendTwoFactorEmail(email: string, code: string) {
    await resend.emails.send({
        from: "SaaS Template <noreply@yourdomain.com>",
        to: email,
        subject: "Your 2FA code",
        html: `
      <h1>Your 2FA code</h1>
      <p>Your 2FA code is: <strong>${code}</strong></p>
      <p>This code will expire in 5 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    });
} 