/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import { z } from "zod";
import { env } from "./src/env";
import {
  netlifyTRPCHandler,
  type CreateNetlifyContextOptions,
} from "trpc-netlify-functions";
import type { Handler } from "@netlify/functions";
// import { prisma } from "./src/prisma";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
// type CreateContextOptions = {
// session: Session | null;
// };

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (_opts: CreateNetlifyContextOptions) => {
  return {
    // prisma,
  };
};

export const createContext = async (opts: CreateNetlifyContextOptions) => {
  // const session = await getSession({ req: opts.req });

  return createInnerTRPCContext(opts);
};

type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? "world"}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
});

export type AppRouter = typeof appRouter;

export { env };

// create server

export const handler: Handler = netlifyTRPCHandler({
  router: appRouter,
  createContext,
});
