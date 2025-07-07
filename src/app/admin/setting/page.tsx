"use client";

import useSWRSignOut from "@/lib/hooks/useSWRSignOut";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Page = () => {
  const { trigger, isMutating } = useSWRSignOut();
  const router = useRouter();

  const handleSignOut = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await trigger();
      router.replace("/admin");
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <h1>הגדרות</h1>
      <h2>התנתק</h2>
      <button onClick={handleSignOut}>
        {isMutating ? "מתנתק..." : "התנתק"}
      </button>
    </div>
  );
};

export default Page;
