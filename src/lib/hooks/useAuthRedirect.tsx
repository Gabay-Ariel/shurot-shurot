"use client";

import { useRouter } from "next/navigation";
import supabaseBrowserClient from "../clients/supabaseBrowserClient";

const useAuthRedirect = () => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();
  (async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user || error) {
      router.replace("/admin");
    }
  })();
};

export default useAuthRedirect;
