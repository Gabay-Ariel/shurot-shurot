// src/lib/hooks/useSWRUpdateUser.ts
import useSWRMutation from "swr/mutation";

type UpdateUserArgs =
  | { password: string; metadata?: never }
  | { metadata: Record<string, any>; password?: never };

export function useSWRUpdateAdmin() {
  return useSWRMutation(
    "/api/auth/update",
    async (_, { arg }: { arg: UpdateUserArgs }) => {
      const res = await fetch("/api/auth/updateAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      return data;
    }
  );
}
