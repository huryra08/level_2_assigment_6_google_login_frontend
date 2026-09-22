"use client";

import { useState } from "react";

type CopyTokenButtonProps = {
	token?: string;
};

export function CopyTokenButton({ token }: CopyTokenButtonProps) {
	const [copied, setCopied] = useState(false);

	const copyToken = async () => {
		if (!token) return;

		await navigator.clipboard.writeText(token);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 2000);
	};

	return (
		<button
			type="button"
			onClick={copyToken}
			disabled={!token}
			className="mt-3 rounded border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
		>
			{copied ? "Copied" : "Copy token"}
		</button>
	);
}