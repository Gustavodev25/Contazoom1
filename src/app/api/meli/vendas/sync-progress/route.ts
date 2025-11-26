import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// Prevent Next.js from buffering the response
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const backendUrl =
    process.env.RENDER_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.BACKEND_URL ||
    "http://localhost:3000";

  // Remove trailing slash if present
  const cleanBackendUrl = backendUrl.replace(/\/$/, "");
  const targetUrl = `${cleanBackendUrl}/api/meli/vendas/sync-progress`;

  console.log(`[SSE Proxy] Connecting to: ${targetUrl}`);

  const sessionCookie = req.cookies.get("session")?.value;

  // Get the token from query param if provided, otherwise fallback to cookie logic if backend supports it
  const tokenParam = req.nextUrl.searchParams.get("token");

  const headers = new Headers();
  if (sessionCookie) {
    headers.set("Cookie", `session=${sessionCookie}`);
  }
  // If the token was passed in the query, the backend might expect it in the query string of the proxied request
  // or in the Authorization header. The original code sent it in the query string.
  
  // Let's construct the URL with query params
  const targetUrlObj = new URL(targetUrl);
  if (tokenParam) {
      targetUrlObj.searchParams.set("token", tokenParam);
  } else if (sessionCookie) {
      // Some backends might accept token directly if extracted from cookie, but here we stick to the original logic
      // which sent a token query param. If the token is in the cookie, we might need to extract it?
      // The original hook extracted 'session' cookie and sent it as 'token' query param.
      targetUrlObj.searchParams.set("token", sessionCookie);
  }

  headers.set("Accept", "text/event-stream");

  try {
    const response = await fetch(targetUrlObj.toString(), {
      headers,
      method: "GET",
      cache: "no-store",
      // Important: maintain the connection
      keepalive: true, 
    });

    if (!response.ok) {
      console.error(`[SSE Proxy] Backend error: ${response.status} ${response.statusText}`);
      return new NextResponse(`Backend Error: ${response.statusText}`, {
        status: response.status,
      });
    }

    if (!response.body) {
        return new NextResponse("No content", { status: 204 });
    }

    // Forward the stream with appropriate headers
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[SSE Proxy] Connection error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
