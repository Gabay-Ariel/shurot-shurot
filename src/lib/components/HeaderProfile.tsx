"use client";

import { useState } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";

const HeaderProfile = () => {
  const user = useAuthRedirect();
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    if (user) setOpen((prev) => !prev);
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <button onClick={handleClick}>פרופיל</button>
      {open && user && (
        <>
          <p>
            {user.user_metadata.first_name} {user.user_metadata.last_name}
          </p>
          <p>{user.user_metadata.clients_email}</p>
          <p>{user.user_metadata.phone_number}</p>
        </>
      )}
    </div>
  );
};

export default HeaderProfile;
