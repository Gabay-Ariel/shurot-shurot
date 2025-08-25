"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import signOutFetcher from "../services/adminAuth/signOutFetcher";
import { useSetAtom } from "jotai";
import { adminAutoAtom } from "../atoms/adminAuto";

const SignOut = () => {
  const router = useRouter();
  const setAdminAuto = useSetAtom(adminAutoAtom);

  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/admin-auth/sign-out",
    signOutFetcher
  );

  const handleSignOut = () => {
    if (!isMutating) trigger();
  };

  useEffect(() => {
    if (!!data && !error) {
      setAdminAuto(null);
      router.push("/admin");
    } else if (error) alert(error.response.data.message);
  }, [data, error, router]);

  return (
    <div>
      <h2>התנתק</h2>
      <button onClick={handleSignOut} disabled={isMutating}>
        {isMutating ? "מתנתק..." : "התנתק"}
      </button>
    </div>
  );
};

export default SignOut;
