import { type NextRequest } from "next/server";

// Ecommerce store only — no auth-gated routes.
// Supabase middleware is kept for cookie session refresh on API routes.
export async function middleware(request: NextRequest) {
  // No route gating needed for the ecom store.
  // All store routes (/store/*, /api/store/*, /api/webhooks/*) are public.
  return new (await import("next/server")).NextResponse(undefined, {
    headers: request.headers,
  });
}

export const config = {
  // No routes need middleware for the ecom store.
  matcher: [],
};
