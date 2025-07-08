"use client";

import InlineEdit from "@/lib/components/InlineEdit";
import useAuthRedirect from "@/lib/hooks/useAuthRedirect";
import useSWRSignOut from "@/lib/hooks/useSWRSignOut";
import { useRouter } from "next/navigation";

const Page = () => {
  const user = useAuthRedirect();
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
      {user && (
        <>
          <h2>פרופיל</h2>
          <InlineEdit
            label="שם פרטי"
            defaultValue={user.user_metadata.first_name}
            field="first_name"
          />
          <InlineEdit
            label="שם משפחה"
            defaultValue={user.user_metadata.last_name}
            field="last_name"
          />
          <InlineEdit
            label="טלפון"
            defaultValue={user.user_metadata.phone_number}
            field="phone_number"
          />
          <InlineEdit
            label="אימייל לקוחות"
            defaultValue={user.user_metadata.clients_email}
            field="clients_email"
          />
        </>
      )}
    </div>
  );
};

export default Page;
