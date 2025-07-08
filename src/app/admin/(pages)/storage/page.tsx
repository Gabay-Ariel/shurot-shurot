"use client";

import useAuthRedirect from "@/lib/hooks/useAuthRedirect";

const Page = () => {
  const y = useAuthRedirect();
  return (
    <div>
      <h1>איחסון</h1>
      <p>{y}</p>
    </div>
  );
};

export default Page;
