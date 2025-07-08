"use client";

import useAuthRedirect from "@/lib/hooks/useAuthRedirect";

const Page = () => {
  useAuthRedirect();

  return (
    <div>
      <h1>איחסון</h1>
    </div>
  );
};

export default Page;
