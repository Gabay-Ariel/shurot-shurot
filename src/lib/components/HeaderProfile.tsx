"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { adminAutoAtom } from "../atoms/adminAuto";

const HeaderProfile = () => {
  const admin = useAtomValue(adminAutoAtom);
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen((prev) => !prev);

  return (
    <div>
      {admin && <button onClick={handleClick}>פרופיל</button>}
      {admin && open && (
        <>
          <p>{`${admin.firstName} ${admin.lastName}`}</p>
          <p>{admin.clientsEmail}</p>
          <p>{admin.phone}</p>
        </>
      )}
    </div>
  );
};

export default HeaderProfile;
