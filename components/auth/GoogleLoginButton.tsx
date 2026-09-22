"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

export function GoogleLoginButton() {
	const buttonRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		const scriptId = "google-identity-services";

		const initialize = () => {
			if (!window.google || !buttonRef.current) return;

			window.google.accounts.id.initialize({
				client_id: GOOGLE_CLIENT_ID,
				callback: handleCredentialResponse,
			});

			window.google.accounts.id.renderButton(buttonRef.current, {
				type: "standard",
				theme: "outline",
				size: "large",
				text: "continue_with",
				shape: "pill",
				width: 320,
			});
		};

		if (document.getElementById(scriptId)) {
			initialize();
			return;
		}

		const script = document.createElement("script");
		script.id = scriptId;
		script.src = "https://accounts.google.com/gsi/client";
		script.async = true;
		script.defer = true;
		script.onload = initialize;
		document.head.appendChild(script);
	}, []);

	const handleCredentialResponse = async (response: { credential: string }) => {
		try {
			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken: response.credential }),
			});

			const result = await res.json();

			if (!res.ok || !result.success) {
				console.error("Google login failed:", result.message);
				return;
			}

			router.push("/dashboard");
			router.refresh();
		} catch (error) {
			console.error("Google login error:", error);
		}
	};

	return <div ref={buttonRef} />;
}
