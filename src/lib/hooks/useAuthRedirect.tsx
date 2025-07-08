"use client";

import { useEffect } from "react";
import supabaseBrowserClient from "../clients/supabaseBrowserClient";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!user || error) {
        router.replace("/admin");
      }
    })();
  }, [router, supabase]);
};
