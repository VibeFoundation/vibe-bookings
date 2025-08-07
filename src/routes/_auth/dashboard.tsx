import { useLiveQuery } from "@tanstack/react-db";
import {
	createFileRoute,
	linkOptions,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { BarChartSquare02, Clapperboard, Settings01 } from "@untitledui/icons";
import { GrRestroomWomen } from "react-icons/gr";
import type {
	NavItemDividerType,
	NavItemType,
} from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { authClient } from "@/lib/auth-client";
import { m } from "@/paraglide/messages";

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
	{
		divider: true,
	},
	{
		label: m.dashboard(),
		href: linkOptions({ to: "/dashboard" }).to,
		icon: BarChartSquare02,
	},
	{
		label: m.reservation(),
		href: linkOptions({ to: "/dashboard/reservation" }).to,
		icon: Clapperboard,
	},
	{
		label: m.Customers(),
		href: linkOptions({ to: "/dashboard/customers" }).to,
		icon: GrRestroomWomen,
		iconSize: "7",
	},
	{
		label: m.service(),
		href: linkOptions({ to: "/dashboard/service" }).to,
		icon: Settings01,
	},
	{
		label: m.staff(),
		href: linkOptions({ to: "/dashboard/staff" }).to,
		icon: Settings01,
	},
	{
		label: m.setting(),
		href: linkOptions({ to: "/dashboard/setting" }).to,
		icon: Settings01,
	},
];

export const SidebarSectionDividersDemo = () => {
	const location = useLocation();
	console.log(location.pathname);

	return (
		<SidebarNavigationSectionDividers
			activeUrl={location.pathname}
			items={navItemsWithDividers}
		/>
	);
};

export const Route = createFileRoute("/_auth/dashboard")({
	component: AdminPanelComponent,
});

function AdminPanelComponent() {
	const navigate = Route.useNavigate();
	// const serviceLiveQuery = useLiveQuery((q) =>
	// 	q
	// 		.from({ service: serviceCollection })
	// 		.select((f) => ({ service: f.service })),
	// );

	// console.log(serviceLiveQuery.data);

	const handleLogout = () => {
		authClient.signOut();
		navigate({ to: "/login" });
	};

	return (
		<div className="flex xs:flex-row flex-col  h-screen bg-gray-50">
			<aside className="lg:block lg:w-64 bg-white border-l border-gray-200">
				<SidebarSectionDividersDemo />
			</aside>

			<div className="flex-1 flex flex-col p-3">
				<Outlet />
			</div>
		</div>
	);
}
