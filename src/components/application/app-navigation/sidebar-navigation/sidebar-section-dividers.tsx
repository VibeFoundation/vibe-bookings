"use client";

import { linkOptions } from "@tanstack/react-router";
import { Link } from "react-aria-components";
import { IoExitOutline } from "react-icons/io5";
import { Button } from "@/components/base/buttons/button";
import { MobileNavigationHeader } from "../base-components/mobile-header";
import { NavList } from "../base-components/nav-list";
import type { NavItemDividerType, NavItemType } from "../config";

interface SidebarNavigationSectionDividersProps {
	/** URL of the currently active item. */
	activeUrl?: string;
	/** List of items to display. */
	items: (NavItemType | NavItemDividerType)[];
}

export const SidebarNavigationSectionDividers = ({
	activeUrl,
	items,
}: SidebarNavigationSectionDividersProps) => {
	const MAIN_SIDEBAR_WIDTH = 256;

	const content = (
		<aside
			style={
				{
					"--width": `${MAIN_SIDEBAR_WIDTH}px`,
				} as React.CSSProperties
			}
			className="flex h-full w-full max-w-full flex-col justify-between   overflow-auto border-secondary bg-primary pt-4 shadow-xs md:border-r lg:w-(--width) lg:border lg:p-5"
		>
			<div>
				<div className="flex flex-col gap-5 px-4 lg:px-5">
					<div className="flex gap-1 items-center ">
						<img
							src="/public/assets/icons/edited-image.png"
							alt="brand-logo"
							width={50}
							height={50}
						/>
						<p className="font-bold text-bg-brand-solid text-3xl">نوبتکی</p>
					</div>
				</div>
				<NavList activeUrl={activeUrl} items={items} className="mt-5" />
			</div>

			<Button
				iconLeading={<IoExitOutline size={30} />}
				href={linkOptions({ to: "/login" }).to}
				color="link-gray"
				className="hover:bg-error-primary flex justify-center hover:text-error-primary_hover"
				size="xl"
			>
				خروج
			</Button>
		</aside>
	);

	return (
		<>
			{/* Mobile header navigation */}
			<MobileNavigationHeader>{content}</MobileNavigationHeader>

			{/* Desktop sidebar navigation */}
			<div className="hidden lg:fixed rtl:lg:right-0 lg:inset-y-0 lg:left-0 lg:flex  lg:pl-1">
				{content}
			</div>

			{/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
			<div
				style={{
					paddingLeft: MAIN_SIDEBAR_WIDTH + 4, // Add 4px to account for the padding in the sidebar wrapper
				}}
				className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
			/>
		</>
	);
};
