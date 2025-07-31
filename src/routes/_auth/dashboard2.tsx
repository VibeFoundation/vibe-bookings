import { createFileRoute } from "@tanstack/react-router";
import {
	BarChartSquare02,
	Folder,
	HomeLine,
	LayoutAlt01,
	MessageChatCircle,
	PieChart03,
	Rows01,
	Settings01,
} from "@untitledui/icons";
import type {
	NavItemDividerType,
	NavItemType,
} from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { BadgeWithDot } from "@/components/base/badges/badges";

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
	{
		label: "Home",
		href: "/",
		icon: HomeLine,
	},
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: BarChartSquare02,
	},
	{
		label: "Projects",
		href: "/projects",
		icon: Rows01,
	},
	{ divider: true },
	{
		label: "Folders",
		icon: Folder,
		href: "/folders",
		items: [
			{ label: "View all", badge: 18, href: "/folders/view-all" },
			{ label: "Recent", badge: 8, href: "/folders/recent" },
			{ label: "Favorites", badge: 6, href: "/folders/favorites" },
			{ label: "Shared", badge: 4, href: "/folders/shared" },
		],
	},
	{ divider: true },
	{
		label: "Reporting",
		href: "/reporting",
		icon: PieChart03,
	},
	{
		label: "Settings",
		href: "/settings",
		icon: Settings01,
	},
	{
		label: "Support",
		href: "/support",
		icon: MessageChatCircle,
		badge: (
			<BadgeWithDot color="success" type="modern" size="sm">
				Online
			</BadgeWithDot>
		),
	},
	{
		label: "Open in browser",
		href: "https://www.untitledui.com/",
		icon: LayoutAlt01,
	},
];

export const SidebarSectionDividersDemo = () => (
	<SidebarNavigationSectionDividers
		activeUrl="/"
		items={navItemsWithDividers}
	/>
);

export const Route = createFileRoute("/_auth/dashboard2")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SidebarSectionDividersDemo />;
}
