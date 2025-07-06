"use client";

import useSWRSignIn from "@/lib/hooks/useSWRSignIn";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { trigger, isMutating, error } = useSWRSignIn();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger({ email, password });
      router.push("/admin/home");
    } catch (error) {
      console.log(error);
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
        {error && <p>{error.response.data.error}</p>}
      </form>
    </>
  );
};

export default Page;
