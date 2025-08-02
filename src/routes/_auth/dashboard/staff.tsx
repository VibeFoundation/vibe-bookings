import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/staff")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/staff"!</div>;
}
