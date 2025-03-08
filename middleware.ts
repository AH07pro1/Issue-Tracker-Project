import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

interface DecodedToken {
  role: string;
  [key: string]: any; // Allow other properties
}

export async function middleware(request: NextRequest) {
  console.log("Middleware called - checking token for path:", request.nextUrl.pathname);

  // Ensure JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET environment variable is not set");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }

  // Get the access token from the cookies
  const token = (await cookies()).get('access-token')?.value;

  // Allow GET requests for all users
  if (request.method === 'GET') {
    console.log("GET request allowed for all users");
    return NextResponse.next();
  }

  // For non-GET requests, check for admin role
  if (!token) {
    console.log("No token found");
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    // Decode and verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    // Check if the role is 'admin'
    if (decoded.role !== 'admin') {
      console.log("User is not admin");
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // If the role is admin, continue
    console.log("Admin access granted");
    return NextResponse.next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token expired");
      return NextResponse.json({ error: "Token expired" }, { status: 403 });
    }
    console.log("Invalid token", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
}

export const config = {
  matcher: [
    "/api/issues/:path*",
    "/api/users/:path*"
  ],
};