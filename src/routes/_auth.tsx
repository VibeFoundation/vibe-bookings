import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_auth")({
	component: AuthComponent,
});

function AuthComponent() {
	const session = authClient.useSession();

	if (!session.data) {
		throw redirect({
			to: "/login",
			search: {
				redirect: location.href,
			},
		});
	}

	return <Outlet />;
}
