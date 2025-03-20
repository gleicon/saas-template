import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateTwoFactorToken } from "@/lib/utils";

export async function POST() {
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

        const twoFactorToken = generateTwoFactorToken();
        await prisma.twoFactorToken.create({
            data: {
                token: twoFactorToken,
                userId: user.id,
                expires: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
            },
        });

        // TODO: Send email with token
        // await sendTwoFactorEmail(user.email, twoFactorToken);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[2FA_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET() {
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

        const twoFactorToken = await prisma.twoFactorToken.findFirst({
            where: {
                userId: user.id,
                expires: { gt: new Date() },
            },
        });

        if (!twoFactorToken) {
            return new NextResponse("No active 2FA token", { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[2FA_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
} 