import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
	useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { I18nProvider, RouterProvider, useLocale } from "react-aria-components";
import { type Locale, overwriteGetLocale } from "@/paraglide/runtime.js";
import { ThemeProvider } from "@/providers/theme-provider.tsx";
import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";
import appCss from "../styles.css?url";

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
		<I18nProvider locale="fa">
			<RootDocument>
				<RootComponent />
			</RootDocument>
		</I18nProvider>
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
				<Outlet />
				<TanStackRouterDevtools />

				<TanStackQueryLayout />
			</RouterProvider>
		</ThemeProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const { locale, direction } = useLocale();
	console.log(locale);

	useEffect(() => {
		overwriteGetLocale(() => {
			if (SUPPORTED_LOCALE.has(locale as "en")) {
				return locale as "en";
			}

			return "en";
		});
	}, [locale]);

	return (
		<html lang={locale} dir={direction}>
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

const SUPPORTED_LOCALE = new Set<Locale>(["en", "fa"]);
