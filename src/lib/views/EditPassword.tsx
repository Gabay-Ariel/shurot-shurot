"use client";

import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import editDetailsFetcher from "../services/adminAuth/editDetailsFetcher";

const EditPassword = () => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/admin-auth/edit-details",
    editDetailsFetcher
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("הסיסמאות אינן תואמות.");
      return;
    }
    if (password.length < 6) {
      alert("הסיסמה חייבת להיות לפחות 6 תווים.");
      return;
    }
    if (!isMutating) trigger({ password });
  };

  useEffect(() => {
    if (!!data && !error) {
      alert("הסיסמה שונתה בהצלחה");
    } else if (error) alert(error.response.data.message);
  }, [data, error]);

  return (
    <div>
      <h2>שנה סיסמה</h2>
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
      </form>
    </div>
  );
};

export default EditPassword;
