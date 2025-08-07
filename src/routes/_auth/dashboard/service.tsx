import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_auth/dashboard/service")({
	context: () => {
		return { title: () => m.service() };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/service"!</div>;
}
