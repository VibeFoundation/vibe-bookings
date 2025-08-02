import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/service")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/service"!</div>;
}
