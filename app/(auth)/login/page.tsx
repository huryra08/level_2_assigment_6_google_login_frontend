import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
			<h1 className="text-2xl font-semibold">Sign in</h1>

			{/* your existing email/password form goes here */}

			<div className="flex w-full max-w-sm items-center gap-3">
				<div className="h-px flex-1 bg-gray-200" />
				<span className="text-sm text-gray-500">or</span>
				<div className="h-px flex-1 bg-gray-200" />
			</div>

			<GoogleLoginButton />
		</div>
	);
}
