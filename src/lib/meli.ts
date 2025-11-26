import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function saveMeliOauthState(state: string, userId: string) {
    await prisma.meliOauthState.create({
        data: {
            state,
            userId,
            expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        },
    });
}

export async function findMeliOauthState(state: string) {
    return prisma.meliOauthState.findUnique({
        where: { state },
        select: { userId: true },
    });
}

export async function deleteMeliOauthState(state: string) {
    try {
        await prisma.meliOauthState.delete({
            where: { state },
        });
    } catch {
        // Ignore if not found
    }
}

export function resolveMeliRedirectUri(req: NextRequest): string {
    const origin = process.env.NEXT_PUBLIC_MELI_REDIRECT_ORIGIN || req.nextUrl.origin;
    // Ensure we don't have double slashes if origin ends with /
    const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    return `${cleanOrigin}/api/meli/callback`;
}

export function resolveMeliCookieSettings(req: NextRequest) {
    const secure = process.env.NODE_ENV === "production";
    // For localhost, domain should be undefined to allow host-only cookie
    // For production, it might need to be set if using subdomains, but usually undefined is fine for same-origin
    const domain = undefined;
    return { secure, domain };
}
