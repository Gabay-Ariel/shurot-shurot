"use client";

import useSWRSignOut from "@/lib/hooks/useSWRSignOut";
import { useRouter } from "next/navigation";

const Page = () => {
  const { trigger, isMutating } = useSWRSignOut();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
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
