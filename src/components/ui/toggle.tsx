"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
	ToggleButton as AriaToggleButton,
	ToggleButtonGroup as AriaToggleButtonGroup,
	composeRenderProps,
	type ToggleButtonGroupProps as AriaToggleButtonGroupProps,
	type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	[
		"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
		/* Disabled */
		"data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		/* Hover */
		"data-[hovered]:bg-muted data-[hovered]:text-muted-foreground",
		/* Selected */
		"data-[selected]:bg-accent data-[selected]:text-accent-foreground",
		/* Focus Visible */
		"data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring",
		/* Resets */
		"focus-visible:outline-none",
	],
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-sm data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
			},
			size: {
				default: "h-9 px-3",
				sm: "h-8 px-2",
				lg: "h-10 px-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ToggleProps
	extends AriaToggleButtonProps,
		VariantProps<typeof toggleVariants> {}

const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
	<AriaToggleButton
		className={composeRenderProps(className, (className) =>
			cn(
				"group-data-[orientation=vertical]/togglegroup:w-full",
				toggleVariants({
					variant,
					size,
					className,
				}),
			),
		)}
		{...props}
	/>
);

const ToggleButtonGroup = ({
	children,
	className,
	...props
}: AriaToggleButtonGroupProps) => (
	<AriaToggleButtonGroup
		className={composeRenderProps(className, (className) =>
			cn(
				"group/togglegroup flex items-center justify-center gap-1 data-[orientation=vertical]:flex-col",
				className,
			),
		)}
		{...props}
	>
		{children}
	</AriaToggleButtonGroup>
);

export { Toggle, toggleVariants, ToggleButtonGroup };
export type { ToggleProps };
