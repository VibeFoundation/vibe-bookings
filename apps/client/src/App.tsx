import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Greeting } from "./Greeting";
import { trpc } from "./utils/trpc";

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.URL
            ? process.env.URL
            : "http://localhost:8888/.netlify/functions/index",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <h1>Hello</h1>
        <Greeting />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
