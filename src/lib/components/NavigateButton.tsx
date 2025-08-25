"use client";

import { useRouter } from "next/navigation";

type Props = {
  to: string;
  title: string;
};

const NavigateButton = ({ to, title }: Props) => {
  const router = useRouter();

  const onClick = () => router.push(to);

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-50 disabled:opacity-60"
    >
      {title}
    </button>
  );
};

export default NavigateButton;
