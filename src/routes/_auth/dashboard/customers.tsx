import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_auth/dashboard/customers")({
	context: () => {
		return { title: () => m.Customers() };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/customers"!</div>;
}
