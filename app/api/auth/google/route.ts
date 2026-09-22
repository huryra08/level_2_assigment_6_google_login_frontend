import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
	const { idToken } = await request.json();

	if (!idToken) {
		return NextResponse.json(
			{ success: false, message: "Missing idToken" },
			{ status: 400 },
		);
	}

	const backendResponse = await fetch(`${API_BASE_URL}/auth/google`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ idToken }),
	});

	const result = await backendResponse.json();

	if (!backendResponse.ok || !result.success) {
		return NextResponse.json(result, { status: backendResponse.status });
	}

	const { accessToken, refreshToken } = result.data;

	const response = NextResponse.json({ success: true, message: "Logged in" });

	const cookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax" as const,
		path: "/",
	};

	response.cookies.set("accessToken", accessToken, {
		...cookieOptions,
		maxAge: 60 * 60 * 24, // 1 day, matches JWT_ACCESS_EXPIRES_IN
	});
	response.cookies.set("refreshToken", refreshToken, {
		...cookieOptions,
		maxAge: 60 * 60 * 24 * 30, // 30 days, matches JWT_REFRESH_EXPIRES_IN
	});
	response.cookies.set("googleIdToken", idToken, {
		...cookieOptions,
		maxAge: 60 * 5,
	});

	return response;
}
