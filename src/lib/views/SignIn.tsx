"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import signInFetcher from "@/lib/services/signInFetcher";

const SignIn = () => {
  const router = useRouter();
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/sign-in",
    signInFetcher
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isMutating) {
      trigger({ email, password });
    }
  };

  useEffect(() => {
    if (!!data && !error) {
      router.push("/admin/home");
    } else if (error) alert(error.response.data.message);
  }, [data, error, router]);

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
