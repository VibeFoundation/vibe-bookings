import { $ } from "bun";

await $`rm -rf node_modules`;
await $`bun install`;
