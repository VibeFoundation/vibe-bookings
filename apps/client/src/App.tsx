import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Greeting } from "./Greeting";
import { trpc } from "./utils/trpc";
import { env } from "server";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: env.URL ? env.URL : "http://localhost:2022",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
