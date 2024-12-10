import { NextResponse } from "next/server";
import { auth } from "@/db/firebase";

export async function middleware(request) {
    const token = await auth.currentUser?.getIdToken(true);

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// Only apply middleware to specific routes (for example, `/dashboard`)
export const config = {
    matcher: ["/protected-route"],
};
