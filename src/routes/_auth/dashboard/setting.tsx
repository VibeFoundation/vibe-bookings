import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/setting")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/setting"!</div>;
}
