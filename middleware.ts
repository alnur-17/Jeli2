import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/lib/supabase/middleware";

// Business-only routes
const BUSINESS_ROUTES = [
  "/app/influencers",
  "/app/campaigns",
  "/app/wallet",
  "/app/ai-manager",
];

// Influencer-only routes (to be built later)
const INFLUENCER_ROUTES = [
  "/app/influencer-dashboard",
  "/app/offers",
  "/app/active-campaigns",
  "/app/earnings",
  "/app/my-stats",
];

// All protected platform routes
const PROTECTED_PREFIXES = ["/app/"];

// Public routes — no auth required
const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/reset-password",
  "/",
  "/businesses",
  "/influencers",
  "/how",
  "/pricing",
  "/contacts",
];

export async function middleware(request: NextRequest) {
<<<<<<< HEAD
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (request.nextUrl.pathname.startsWith("/app")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl, supabaseKey,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (c) =>
          c.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          ),
      },
    }
  );


  // Only protect /app/* routes
  if (!PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    return supabaseResponse;
  }

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Fetch role from profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role as "business" | "influencer" | null;

  // Business trying to access influencer-only routes
  if (role === "business" && INFLUENCER_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  // Influencer trying to access business-only routes
  if (role === "influencer" && BUSINESS_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/app/influencer-dashboard", request.url));
  }

  // Redirect to role-specific dashboard from /app/dashboard if influencer
  if (role === "influencer" && pathname === "/app/dashboard") {
    return NextResponse.redirect(new URL("/app/influencer-dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
