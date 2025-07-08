"use client";

import NavigateButton from "@/lib/components/NavigateButton";
import { useAuthRedirect } from "@/lib/hooks/useAuthRedirect";

const Page = () => {
  useAuthRedirect();

  return (
    <div>
      <h1>נהל את האתר שורות שורות</h1>
      <NavigateButton href="/admin/storage" label="איחסון" />
      <NavigateButton href="/admin/setting" label="הגדרות" />
    </div>
  );
};

export default Page;
