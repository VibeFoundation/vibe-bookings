import {
	createRouter as createTanstackRouter,
	type NavigateOptions,
	type ToOptions,
} from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import type {} from "react-aria-components";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles/styles.css";

// Create a new router instance
export const createRouter = () => {
	const router = routerWithQueryClient(
		createTanstackRouter({
			routeTree,
			context: {
				...TanstackQuery.getContext(),
			},
			scrollRestoration: true,
			defaultPreloadStaleTime: 0,
		}),
		TanstackQuery.getContext().queryClient,
	);

	return router;
};

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

declare module "react-aria-components" {
	interface RouterConfig {
		href: ToOptions;
		routerOptions: Omit<NavigateOptions, keyof ToOptions>;
	}
}
