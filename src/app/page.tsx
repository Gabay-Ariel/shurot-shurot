import NavigateButton from "@/lib/components/NavigateButton";
import "./globals.css";

const Page = () => {
  return (
    <>
      <NavigateButton href="/shurot-shurot" label="אתר" />
      <NavigateButton href="/admin" label="ניהול" />
    </>
  );
};

export default Page;
