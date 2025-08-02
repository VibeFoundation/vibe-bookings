import { useLiveQuery } from "@tanstack/react-db";
import {
	createFileRoute,
	Link,
	linkOptions,
	Outlet,
} from "@tanstack/react-router";
import { BarChartSquare02, Clapperboard, Settings01 } from "@untitledui/icons";
import { useState } from "react";
import { GrRestroomWomen } from "react-icons/gr";
import type {
	NavItemDividerType,
	NavItemType,
} from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { serviceCollection } from "@/collections/service";
import { authClient } from "@/lib/auth-client";
import { m } from "@/paraglide/messages";
import { MenuIcon } from "@/components/icons/icons";

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

export const SidebarSectionDividersDemo = () => (
	<SidebarNavigationSectionDividers
		activeUrl="/"
		items={navItemsWithDividers}
	/>
);

export const Route = createFileRoute("/_auth/dashboard")({
	component: AdminPanelComponent,
});

function AdminPanelComponent() {
	const navigate = Route.useNavigate();
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const serviceLiveQuery = useLiveQuery((q) =>
		q
			.from({ service: serviceCollection })
			.select((f) => ({ service: f.service })),
	);

	console.log(serviceLiveQuery.data);

	const handleLogout = () => {
		authClient.signOut();
		navigate({ to: "/login" });
	};

	return (
		<div className="flex h-screen bg-gray-50">
			<aside className="hidden lg:block w-64 bg-white border-l border-gray-200">
				<SidebarSectionDividersDemo />
			</aside>
			<button
				type="button"
				className={`fixed inset-0 z-30 transition-opacity bg-black bg-opacity-25 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				onClick={() => setSidebarOpen(false)}
			></button>
			<aside
				className={`fixed top-0 right-0 h-full w-64 bg-white z-40 transform transition-transform lg:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<SidebarSectionDividersDemo />
			</aside>

			<div className="flex-1 flex flex-col overflow-hidden">
				<header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
					<div className="flex items-center">
						<button
							type="button"
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden text-gray-500 mr-4"
						>
							<MenuIcon />
						</button>
						<h1 className="text-xl sm:text-2xl font-bold text-gray-800">
							داشبورد
						</h1>
					</div>
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
