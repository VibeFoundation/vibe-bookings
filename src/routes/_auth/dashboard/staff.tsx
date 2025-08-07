import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";
export const Route = createFileRoute("/_auth/dashboard/staff")({
	context: () => {
		return { title: () => m.staff() };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/staff"!</div>;
}
