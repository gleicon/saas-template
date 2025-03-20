import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { sendTwoFactorEmail } from "@/lib/email";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Generate secret
        const secret = speakeasy.generateSecret({
            name: `SaaS Template (${user.email})`,
        });

        // Generate QR code
        const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

        // Store secret temporarily
        await prisma.user.update({
            where: { id: user.id },
            data: { twoFactorSecret: secret.base32 },
        });

        return NextResponse.json({ qrCode });
    } catch (error) {
        console.error("[2FA_SETUP_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { code } = await req.json();

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || !user.twoFactorSecret) {
            return new NextResponse("User not found or 2FA not set up", { status: 404 });
        }

        // Verify code
        const isValid = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token: code,
        });

        if (!isValid) {
            return new NextResponse("Invalid code", { status: 400 });
        }

        // Generate backup codes
        const backupCodes = Array.from({ length: 8 }, () =>
            Math.random().toString(36).substring(2, 8).toUpperCase()
        );

        // Enable 2FA and store backup codes
        await prisma.user.update({
            where: { id: user.id },
            data: {
                twoFactorEnabled: true,
                backupCodes: JSON.stringify(backupCodes),
            },
        });

        return NextResponse.json({ backupCodes });
    } catch (error) {
        console.error("[2FA_VERIFY_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Disable 2FA
        await prisma.user.update({
            where: { id: user.id },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null,
                backupCodes: null,
            },
        });

        return NextResponse.json({ message: "2FA disabled" });
    } catch (error) {
        console.error("[2FA_DISABLE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
} 