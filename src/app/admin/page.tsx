"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useSWRSignIn from "@/lib/hooks/useSWRSignIn";

const Page = () => {
  const { trigger, isMutating, error } = useSWRSignIn();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      await trigger({ email, password });
      router.push("/admin/home");
    } catch (error) {
      error;
    }
  };

  return (
    <>
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
        {!!error?.response && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error?.response.data.message}
          </p>
        )}
      </form>
    </>
  );
};

export default Page;
