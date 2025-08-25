"use client";

import { adminAutoAtom } from "@/lib/atoms/adminAuto";
import supabaseBrowserClient from "@/lib/clients/supabaseBrowserClient";
import NavigateButton from "@/lib/components/NavigateButton";
import { Admin } from "@/lib/types/admin";
import SignIn from "@/lib/views/SignIn";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const Page = () => {
  const supabase = supabaseBrowserClient();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminAuto, setAdminAuto] = useAtom(adminAutoAtom);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && !!data) {
        const admin: Admin = {
          firstName: data.user.user_metadata.firstName,
          lastName: data.user.user_metadata.lastName,
          clientsEmail: data.user.user_metadata.clientsEmail,
          phone: data.user.user_metadata.phone,
          email: data.user.email,
        };
        setAdminAuto(admin);
      }
      setIsLoading(false);
    })();
  }, [supabase.auth, setAdminAuto]);

  return isLoading ? (
    <p>...טוען</p>
  ) : !adminAuto ? (
    <div>
      <h1>דף התחברות</h1>
      <SignIn />
    </div>
  ) : (
    <div>
      <h1>דף הבית</h1>
      <NavigateButton href="/admin/storage" label="איחסון" />
      <NavigateButton href="/admin/setting" label="הגדרות" />
    </div>
  );
};

export default Page;
