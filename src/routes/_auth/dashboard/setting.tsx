import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_auth/dashboard/setting")({
	context: () => {
		return { title: () => m.setting() };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_auth/dashboard/setting"!</div>;
}
