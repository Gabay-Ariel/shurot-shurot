import HeaderProfile from "@/lib/components/HeaderProfile";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <>
      <header>
        <HeaderProfile />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
