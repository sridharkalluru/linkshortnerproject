---
description: >
  Rules and guidelines for authentication in the Link Shortener project.
  Apply these instructions whenever working on auth, route protection,
  redirects, sign-in/sign-up flows, or any Clerk-related code.
applyTo: "app/**,middleware.ts,components/**"
---

# Authentication — Clerk

## Core Rule

**Clerk is the sole authentication provider for this application.**
No other authentication method, library, or custom implementation is permitted (no NextAuth, no custom JWT, no session cookies, no Firebase Auth, etc.). If a task requires authentication, use Clerk. Period.

---

## Routing & Access Rules

| Route            | Behaviour                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `/` (homepage)   | If the user **is** signed in → redirect to `/dashboard`. If the user is **not** signed in → render normally. |
| `/dashboard`     | Protected. User MUST be signed in. If not signed in → Clerk handles redirect to sign-in modal.               |
| All other routes | Public unless explicitly marked as protected in middleware.                                                  |

---

## Middleware

Use Clerk's `clerkMiddleware` (from `@clerk/nextjs/server`) with `createRouteMatcher` to enforce route protection and the homepage redirect.

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from the homepage
  if (userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /dashboard — Clerk will handle the redirect to sign-in
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

---

## Sign-In & Sign-Up UI

- Sign-in and sign-up **must always launch as Clerk modals** — never as dedicated full-page routes.
- Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` from `@clerk/nextjs`.
- Do **not** create custom `/sign-in` or `/sign-up` pages.

```tsx
// Correct — modal mode
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal">
  <button>Sign in</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign up</button>
</SignUpButton>
```

---

## Accessing the Authenticated User

### Server Components / Route Handlers / Server Actions

```ts
import { auth, currentUser } from "@clerk/nextjs/server";

// Lightweight — just the userId
const { userId } = await auth();

// Full user object — use only when needed
const user = await currentUser();
```

### Client Components

```tsx
import { useUser, useAuth } from "@clerk/nextjs";

const { user, isLoaded, isSignedIn } = useUser();
const { userId } = useAuth();
```

---

## ClerkProvider

`<ClerkProvider>` must wrap the entire application. Place it in `app/layout.tsx`:

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

---

## Required Environment Variables

These must exist in `.env.local`. Never hard-code them into source files:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

`CLERK_SECRET_KEY` must **never** be prefixed with `NEXT_PUBLIC_` — doing so would expose it to the browser.

---

## Prohibitions

- Do **not** use any non-Clerk authentication library or method.
- Do **not** create standalone `/sign-in` or `/sign-up` pages.
- Do **not** manually set auth cookies, sessions, or JWTs.
- Do **not** bypass Clerk's `auth.protect()` with custom guards in middleware.
- Do **not** expose `CLERK_SECRET_KEY` to the client.
