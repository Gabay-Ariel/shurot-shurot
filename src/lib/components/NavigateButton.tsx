"use client";

import { useRouter } from "next/navigation";

interface Props {
  href: string;
  label: string;
  disabled?: boolean;
}

const NavigateButton = ({ href, label, disabled = false }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (!disabled) {
      router.push(href);
    }
  };

  return (
    <button disabled={disabled} onClick={handleClick}>
      {label}
    </button>
  );
};

export default NavigateButton;
