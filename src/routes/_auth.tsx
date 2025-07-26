import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
	beforeLoad: ({ location }) => {
		const session = authClient.useSession();
		if (!session.data) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: Outlet,
});
