import { createFileRoute, linkOptions } from "@tanstack/react-router";

import { Button } from "@/components/base/buttons/button";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const url = linkOptions({
		to: "/login",
	}).to;
	return (
		<div className="text-center w-full h-[100dvh] flex items-center justify-center">
			<Button href={url} color="link-color" size="xl">
				Login
			</Button>
		</div>
	);
}
