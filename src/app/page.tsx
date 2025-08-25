"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const checkPassword = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    console.log(data.valid);

    if (data.valid) {
      setIsError(false);
      router.push("/home");
    } else {
      setIsError(true);
    }
  };

  return (
    <>
      <input onChange={(e) => setPassword(e.target.value)} />
      <button onClick={checkPassword}>כנס</button>
      {isError && (
        <p style={{ color: "red" }}>שגיאה כללית עם השרתים. סטטוס שגיאה 500</p>
      )}
    </>
  );
};

export default Page;
