"use client";

import { ChangeEvent, useState } from "react";
import { useSWRUpdateAdmin } from "../hooks/useSWRUpdateAdmin";

interface Props {
  label: string;
  field: string;
  defaultValue: string;
}

const InlineEdit = ({ label, defaultValue, field }: Props) => {
  const { trigger, isMutating } = useSWRUpdateAdmin();
  const [value, setValue] = useState<string>(defaultValue);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleEdit = () => setIsEditing(true);

  const handleOK = async () => {
    try {
      await trigger({ metadata: { [field]: value } });
      window.location.reload();
    } catch (error) {
      alert(`${error} נכשל`);
      setValue(defaultValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(defaultValue);
  };

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
