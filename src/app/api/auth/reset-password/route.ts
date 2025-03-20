import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return new NextResponse("Email is required", { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Generate reset token
        const resetToken = randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Store reset token in database
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // TODO: Send reset email
        // For now, we'll just return the token in the response
        // In production, you should send this via email
        return NextResponse.json({
            message: "Password reset token generated",
            resetToken, // Remove this in production
        });
    } catch (error) {
        console.error("[PASSWORD_RESET_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return new NextResponse("Token and password are required", { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return new NextResponse("Invalid or expired reset token", { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("[PASSWORD_UPDATE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
} 