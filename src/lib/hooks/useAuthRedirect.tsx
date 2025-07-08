"use client";

import { useEffect } from "react";
import supabaseBrowserClient from "../clients/supabaseBrowserClient";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if ((!user || error) && isMounted) {
        router.replace("/admin");
      }
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session && isMounted) {
          router.replace("/admin");
        }
      }
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [router, supabase]);
};
