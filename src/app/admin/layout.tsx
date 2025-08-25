import HeaderProfile from "@/lib/components/HeaderProfile";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <>
      <header style={{ backgroundColor: "beige" }}>
        <h1>ניהול אתר שורות שורות</h1>
        <HeaderProfile />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
