import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
	beforeLoad: async ({ location }) => {
		const session = await authClient.getSession();

		if (!session.data) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}

		return { ...session.data };
	},
	component: Outlet,
});
