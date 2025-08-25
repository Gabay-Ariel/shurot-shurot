"use client";

import { ChangeEvent, useEffect, useState } from "react";
import editDetailsFetcher from "../services/adminAuth/editDetailsFetcher";
import useSWRMutation from "swr/mutation";

interface Props {
  label: string;
  field: string;
  defaultValue: string;
}

const InlineEdit = ({ label, defaultValue, field }: Props) => {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/admin-auth/edit-details",
    editDetailsFetcher
  );

  const [value, setValue] = useState<string>(defaultValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleEdit = () => setIsEditing(true);

  const handleOK = () => {
    if (!isMutating) trigger({ metadata: { [field]: value } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(defaultValue);
  };

  useEffect(() => {
    if (!!data && !error) {
      alert("שונה בהצלחה!");
    } else if (error) alert("השינוי נכשל. " + error.response.data.message);
  }, [data, error]);

  return (
    <div style={{ border: "1px solid black" }}>
      <label>:{label}</label>
      {isEditing ? (
        <div>
          <button onClick={handleOK} disabled={isMutating}>
            {isMutating ? "מעדכן.." : "שמור"}
          </button>
          <button onClick={handleCancel} disabled={isMutating}>
            בטל
          </button>
          <input type="text" value={value} onChange={handleChange} />
        </div>
      ) : (
        <div>
          <button onClick={handleEdit}>ערוך</button>
          <span>{value}</span>
        </div>
      )}
    </div>
  );
};

export default InlineEdit;
