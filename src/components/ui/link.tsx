import { type VariantProps } from "class-variance-authority";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import {
	mergeProps,
	useFocusRing,
	useHover,
	useLink,
	useObjectRef,
	type AriaLinkOptions,
} from "react-aria";
import React from "react";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./button";

interface RACLinkProps
	extends Omit<AriaLinkOptions, "href">,
		VariantProps<typeof buttonVariants> {
	children?: React.ReactNode;
	className?: string;
}

const RACLinkComponent = React.forwardRef<HTMLAnchorElement, RACLinkProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);

		const { isPressed, linkProps } = useLink(props, ref);
		const { isHovered, hoverProps } = useHover(props);
		const { isFocusVisible, isFocused, focusProps } = useFocusRing(props);

		return (
			<a
				{...mergeProps(linkProps, hoverProps, focusProps, props)}
				className={cn(
					props.variant &&
						buttonVariants({
							variant: props.variant,
							size: props.size,
							className: props.className,
						}),
				)}
				ref={ref}
				data-hovered={isHovered || undefined}
				data-pressed={isPressed || undefined}
				data-focus-visible={isFocusVisible || undefined}
				data-focused={isFocused || undefined}
			/>
		);
	},
);

const CreatedLinkComponent = createLink(RACLinkComponent);

export const CustomLink: LinkComponent<typeof RACLinkComponent> = (props) => {
	return <CreatedLinkComponent preload={"intent"} {...props} />;
};
export { CustomLink as Link };
export type { RACLinkProps as LinkProps };
