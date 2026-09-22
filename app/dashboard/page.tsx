import { cookies } from "next/headers";
import { CopyTokenButton } from "@/components/auth/CopyTokenButton";

export default async function DashboardPage() {
	const requestCookies = await cookies();
	const googleIdToken = requestCookies.get("googleIdToken")?.value;

	return (
		<main className="min-h-screen p-8">
			<h1 className="text-2xl font-semibold">Dashboard</h1>
			<section className="mt-6 max-w-3xl">
				<h2 className="text-lg font-medium">Google ID token</h2>
				<pre className="mt-2 overflow-x-auto rounded border p-4 text-sm">
					{googleIdToken ?? "No Google ID token found. Please sign in first."}
				</pre>
				<CopyTokenButton token={googleIdToken} />
			</section>
		</main>
	);
}