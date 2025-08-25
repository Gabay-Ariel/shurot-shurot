"use client";

import InlineEdit from "../components/InlineEdit";
import useAuthRedirect from "@/lib/hooks/useAuthRedirect";

const EditDetails = () => {
  const user = useAuthRedirect();

  return user ? (
    <div>
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
    </div>
  ) : (
    "לא ניתן להציג את האפשרות לעדכון"
  );
};

export default EditDetails;
