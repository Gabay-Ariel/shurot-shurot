import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { checkIsAuth } from "@/app/server/checkIsAuth";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  try {
    const isAuth = await checkIsAuth();
    if (isAuth) {
      return (
        <>
          <p>ישישישישי</p>
          <main>{children}</main>
        </>
      );
    }
    if (!isAuth) return redirect("/admin");
  } catch (error) {
    return redirect("/admin");
  }
};

export default Layout;
