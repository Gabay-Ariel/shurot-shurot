// "use client";

// import { useRouter } from "next/navigation";
// import supabaseBrowserClient from "../clients/supabaseBrowserClient";
// import { useEffect } from "react";
// import { User } from "@supabase/auth-js";

// const useAuthRedirect = (): void | null | User => {
//   const router = useRouter();
//   const supabase = supabaseBrowserClient();
//   let user: User | null = null;
//   useEffect(() => {
//     (async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (!data.user || error) {
//         router.replace("/admin");
//       } else {
//         user = data.user;
//       }
//     })();
//   }, [supabase.auth, router]);
//   return user;
// };

// app/components/AuthUser.tsx
"use client";

import { useEffect, useState } from "react";
import supabaseBrowserClient from "../clients/supabaseBrowserClient";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const supabase = supabaseBrowserClient();

const useAuthRedirect = (): User | null => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data.user || error) {
        router.replace("/admin");
      } else {
        setUser(data.user);
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        (_, session) => {
          setUser(session?.user ?? null);
        }
      );

      return () => {
        listener.subscription.unsubscribe();
      };
    })();
  }, [router]);

  return user;
};

export default useAuthRedirect;
