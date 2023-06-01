import { trpc } from "./utils/trpc";

export function Greeting() {
  const greeting = trpc.greeting.useQuery({ name: "tRPC user" });

  return (
    <div>
      <p>{greeting.data?.text}</p>
    </div>
  );
}
