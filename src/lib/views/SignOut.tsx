"use client";

import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import signOutFetcher from "../services/signOutFetcher";
import { useEffect } from "react";

const SignOut = () => {
  const router = useRouter();
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/sign-out",
    signOutFetcher
  );

  const handleSignOut = () => {
    if (!isMutating) trigger();
  };

  useEffect(() => {
    if (!!data && !error) {
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
