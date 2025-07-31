import { createLink } from "@tanstack/react-router";
import { MenuItem, Link as ReactAriaLink } from "react-aria-components";

export const Link = createLink(ReactAriaLink);
export const MenuItemLink = createLink(MenuItem);
