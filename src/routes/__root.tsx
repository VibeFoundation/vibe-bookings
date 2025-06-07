import {
	Outlet,
	HeadContent,
	Scripts,
	createRootRouteWithContext,
	type ToOptions,
	type NavigateOptions,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

import { RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
	interface RouterConfig {
		href: ToOptions;
		routerOptions: Omit<NavigateOptions, keyof ToOptions>;
	}
}
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

	component: () => {
		const router = useRouter();
		return (
			<RootDocument>
				<RouterProvider
					navigate={(href, opts) => router.navigate({ ...href, ...opts })}
					useHref={(href) => router.buildLocation(href).href}
				>
					<Header />

					<Outlet />
					<TanStackRouterDevtools />

					<TanStackQueryLayout />
				</RouterProvider>
			</RootDocument>
		);
	},
});

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
