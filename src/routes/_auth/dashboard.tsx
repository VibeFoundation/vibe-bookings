import { useState } from "react";
import {
	createFileRoute,
	Link,
	linkOptions,
	Outlet,
} from "@tanstack/react-router";
import { auth } from "../../lib/auth";
import {
	MenuIcon,
	DashboardIcon,
	AppointmentsIcon,
	ClientsIcon,
	ServicesIcon,
	StaffIcon,
	SettingsIcon,
	LogoutIcon,
} from "../../components/icons/icons";

export const Route = createFileRoute("/_auth/dashboard")({
	component: AdminPanelComponent,
});

function AdminPanelComponent() {
	const navigate = Route.useNavigate();
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const handleLogout = () => {
		auth.logout();
		navigate({ to: "/login" });
	};

	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			<div className="h-20 flex items-center justify-center border-b border-gray-200 shrink-0">
				coming soon
			</div>
			<nav className="flex-1 px-4 py-6 space-y-2">
				{[
					{ icon: <DashboardIcon />, label: "داشبورد", active: true },
					{
						icon: <AppointmentsIcon />,
						label: "نوبت‌ها",
						to: linkOptions({ to: "/dashboard/bookedAppointments" }).to,
					},
					{ icon: <ClientsIcon />, label: "مشتریان", to: "/dashboard/clients" },
					{ icon: <ServicesIcon />, label: "خدمات", to: "/dashboard/services" },
					{ icon: <StaffIcon />, label: "کارکنان", to: "/dashboard/staff" },
					{
						icon: <SettingsIcon />,
						label: "تنظیمات",
						to: "/dashboard/settings",
					},
				].map((item) => (
					<Link
						key={item.label}
						to={item.to}
						className={`flex items-center gap-3 px-4 py-2.5 text-gray-600 font-semibold rounded-lg transition-colors ${item.active ? "bg-purple-100 text-purple-600" : "hover:bg-gray-100"}`}
					>
						{item.icon}
						<span>{item.label}</span>
					</Link>
				))}
			</nav>
			<div className="px-4 py-4 border-t border-gray-200">
				<button
					type="button"
					onClick={handleLogout}
					className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
				>
					<LogoutIcon />
					<span>خروج</span>
				</button>
			</div>
		</div>
	);

	return (
		<div className="flex h-screen bg-gray-50 font-sans" dir="rtl">
			<aside className="hidden lg:block w-64 bg-white border-l border-gray-200">
				<SidebarContent />
			</aside>
			<button
				type="button"
				className={`fixed inset-0 z-30 transition-opacity bg-black bg-opacity-25 lg:hidden ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
				onClick={() => setSidebarOpen(false)}
			></button>
			<aside
				className={`fixed top-0 right-0 h-full w-64 bg-white z-40 transform transition-transform lg:hidden ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
			>
				<SidebarContent />
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
