/* We cannot use type `unknown` instead of `any` here because it will break the type assertion `isReactComponent` function is providing. */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

type ReactComponent =
	| React.FC<unknown>
	| React.ComponentClass<unknown, unknown>;

/**
 * Checks if a given value is a function component.
 */
export const isFunctionComponent = (
	component: unknown,
): component is React.FC<unknown> => {
	return typeof component === "function";
};

/**
 * Checks if a given value is a class component.
 */
export const isClassComponent = (
	component: unknown,
): component is React.ComponentClass<unknown, unknown> => {
	return (
		typeof component === "function" &&
		component.prototype &&
		(!!component.prototype.isReactComponent || !!component.prototype.render)
	);
};

/**
 * Checks if a given value is a forward ref component.
 */
export const isForwardRefComponent = (
	component: unknown,
): component is React.ForwardRefExoticComponent<unknown> => {
	return (
		typeof component === "object" &&
		component !== null &&
		// @ts-expect-error checking if this is a react forward component
		component.$$typeof.toString() === "Symbol(react.forward_ref)"
	);
};

/**
 * Checks if a given value is a valid React component.
 */
export const isReactComponent = (
	component: unknown,
): component is ReactComponent => {
	return (
		isFunctionComponent(component) ||
		isForwardRefComponent(component) ||
		isClassComponent(component)
	);
};
