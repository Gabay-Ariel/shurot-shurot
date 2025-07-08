"use client";

import { useState } from "react";
import useSWRUpdateAdmin from "../hooks/useSWRUpdateAdmin";

const ChangePassword = () => {
  const { trigger, isMutating, error: err } = useSWRUpdateAdmin();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }

    if (password.length < 6) {
      setError("הסיסמה חייבת להיות לפחות 6 תווים.");
      return;
    }
    if (err) setError(err);

    trigger({ password });
  };

  return (
    <form style={{ border: "1px solid black" }} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="newPassword">סיסמה חדשה:</label>
        <input
          type="password"
          id="newPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isMutating}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="confirmPassword">אשר סיסמה חדשה:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isMutating}
        />
      </div>
      <button type="submit" disabled={isMutating}>
        {isMutating ? "משנה..." : "שנה סיסמה"}
      </button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ChangePassword;
