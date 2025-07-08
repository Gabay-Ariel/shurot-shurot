import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <>
      <p>ניהול</p>
      <main>{children}</main>
    </>
  );
};

export default Layout;
