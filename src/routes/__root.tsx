import {
	Outlet,
	HeadContent,
	Scripts,
	createRootRouteWithContext,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "react-aria-components";
import { ThemeProvider } from "@/providers/theme-provider.tsx";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	component: () => (
		<RootDocument>
			<RootComponent />
		</RootDocument>
	),
});

function RootComponent() {
	const router = useRouter();

	return (
		<ThemeProvider>
			<RouterProvider
				navigate={(href, opts) => router.navigate({ ...href, ...opts })}
				useHref={(href) => router.buildLocation(href).href}
			>
				<Header />
				<Outlet />
				<TanStackRouterDevtools />

				<TanStackQueryLayout />
			</RouterProvider>
		</ThemeProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
