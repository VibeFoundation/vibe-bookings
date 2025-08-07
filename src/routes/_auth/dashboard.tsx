import { useLiveQuery } from "@tanstack/react-db";
import {
	createFileRoute,
	Link,
	linkOptions,
	Outlet,
	useLocation,
} from "@tanstack/react-router";
import { BarChartSquare02, Clapperboard, Settings01 } from "@untitledui/icons";
import { useState } from "react";
import { GrRestroomWomen } from "react-icons/gr";
import { serviceCollection } from "@/collections/service";
import type {
	NavItemDividerType,
	NavItemType,
} from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import HeaderTitle from "@/components/headerTitle";
import { MenuIcon } from "@/components/icons/icons";
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
	const [isSidebarOpen, setSidebarOpen] = useState(false);
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

			<div className="flex-1 flex flex-col">
				<header className="h-20 bg-white border-b hidden lg:flex border-gray-200  items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
					<h1 className="text-xl sm:text-2xl font-bold text-gray-800">
						<HeaderTitle />
					</h1>

					<button
						type="button"
						className="bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors hidden sm:block"
					>
						+ افزودن نوبت
					</button>
				</header>

				<Outlet />
			</div>
		</div>
	);
}
