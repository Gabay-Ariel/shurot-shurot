"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import signInFetcher from "../services/adminAuth/signInFetcher";
import supabaseBrowserClient from "../clients/supabaseBrowserClient";
import { useAtomValue, useSetAtom } from "jotai";
import { adminAutoAtom } from "../atoms/adminAuto";
import { Admin } from "../types/admin";

const SignIn = () => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/admin-auth/sign-in",
    signInFetcher
  );

  const setAdminAuto = useSetAtom(adminAutoAtom);
  const aa = useAtomValue(adminAutoAtom);
  useEffect(() => {
    console.log({ aa });
  }, [aa]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isMutating) trigger({ email, password });
  };

  useEffect(() => {
    if (error) alert(error.response.data.message);
  }, [error, router]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">אימייל:</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">סיסמא:</label>
      <input
        id="password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isMutating}>
        {isMutating ? "...מתחבר" : "התחבר"}
      </button>
    </form>
  );
};

export default SignIn;
