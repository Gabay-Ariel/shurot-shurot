"use client";

import SignOut from "@/lib/views/SignOut";
import ChangePassword from "@/lib/components/ChangePassword";
import InlineEdit from "@/lib/components/InlineEdit";
import useAuthRedirect from "@/lib/hooks/useAuthRedirect";

const Page = () => {
  const user = useAuthRedirect();

  return (
    <div>
      <h1>הגדרות</h1>
      <SignOut />

      <h2>שנה סיסמא</h2>
      <ChangePassword />
      {user ? (
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
      ) : (
        <p>נתיב האלה</p>
      )}
    </div>
  );
};

export default Page;
