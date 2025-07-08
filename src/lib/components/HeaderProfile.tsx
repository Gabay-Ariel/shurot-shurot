"use client";

import useAuthRedirect from "../hooks/useAuthRedirect";

const HeaderProfile = () => {
  const user = useAuthRedirect();

  return (
    <div style={{ border: "1px solid black" }}>
      {user && (
        <p>
          {user.user_metadata.first_name} {user.user_metadata.last_name}
        </p>
      )}
    </div>
  );
};

export default HeaderProfile;
