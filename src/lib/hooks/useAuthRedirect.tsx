// "use client";

// import supabaseBrowserClient from "../clients/supabaseBrowserClient";
// // import { useRouter } from "next/navigation";

// const useAuthRedirect = () => {
//   // const router = useRouter();
//   const supabase = supabaseBrowserClient();
//   (async () => {
//     const {
//       data: { user },
//       // error,
//     } = await supabase.auth.getUser();
//     if (!user) {
//       // router.replace("/admin");
//       console.log("ffffffff");
//     } else {
//       console.log("####");
//     }
//   })();
// };

// export default useAuthRedirect;

"use client";

import { useEffect } from "react";
import supabaseBrowserClient from "../clients/supabaseBrowserClient";
import { useRouter } from "next/navigation";

const useAuthRedirect = () => {
  const router = useRouter();
  const supabase = supabaseBrowserClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // מנסה להביא את ה-session הקיים
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          console.error("שגיאה בקבלת session:", sessionError);
        }

        let user = sessionData?.session?.user;

        // אם אין משתמש, מנסה לרענן session
        if (!user) {
          console.log("לא נמצא session – מנסה לרענן...");
          const { data: refreshed, error: refreshError } =
            await supabase.auth.refreshSession();

          if (refreshError) {
            console.error("שגיאה ברענון session:", refreshError);
          }

          user = refreshed?.user;
        }

        if (!user) {
          console.log("אין משתמש מחובר – מעביר ל-/admin");
          router.replace("/admin");
        } else {
          console.log("משתמש מחובר:", user.email);
        }
      } catch (err) {
        console.error("שגיאה כללית ב-checkUser:", err);
      }
    };

    checkUser();
  }, [router, supabase.auth]);
};

export default useAuthRedirect;

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import supabaseBrowserClient from "../clients/supabaseBrowserClient";

// export const useAuthRedirect = () => {
//   const router = useRouter();
//   const supabase = supabaseBrowserClient();

//   // מצב טעינה שיעזור לנו להציג UI מתאים בזמן בדיקת האימות
//   const [isLoadingAuth, setIsLoadingAuth] = useState(true);

//   useEffect(() => {
//     let isMounted = true; // דגל לוודא שהקומפוננטה עדיין מורכבת

//     const checkUserAuthentication = async () => {
//       console.log("useAuthRedirect: Starting authentication check.");

//       // נשתמש ב-getSession() שהוא מהיר יותר בצד לקוח ומשתמש ב-localStorage/cookies
//       const {
//         data: { session },
//         error,
//       } = await supabase.auth.getSession();

//       if (error) {
//         console.error("useAuthRedirect: Error getting session:", error.message);
//       } else {
//         console.log("useAuthRedirect: Current session:", session);
//       }

//       // אם אין סשן פעיל או שיש שגיאה, ונמצאים במצב mounted, מפנים מחדש
//       if ((!session || error) && isMounted) {
//         console.log(
//           "useAuthRedirect: No active session or error. Redirecting to /admin."
//         );
//         router.replace("/admin");
//       }
//       setIsLoadingAuth(false); // סיימנו את בדיקת האימות הראשונית
//     };

//     // הפעלת הבדיקה הראשונית עם טעינת הקומפוננטה
//     checkUserAuthentication();

//     // האזנה לשינויים במצב האימות (לוגין / לוגאוט)
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         console.log(
//           "useAuthRedirect: Auth state changed. Event:",
//           _event,
//           "Session:",
//           session
//         );
//         if (!session && isMounted) {
//           console.log("useAuthRedirect: Session ended. Redirecting to /admin.");
//           router.replace("/admin");
//         }
//         setIsLoadingAuth(false); // ודא שמצב הטעינה מתעדכן גם בשינויי מצב
//       }
//     );

//     // פונקציית ניקוי (cleanup) של ה-useEffect
//     return () => {
//       isMounted = false; // מסמנים שהקומפוננטה אינה מורכבת יותר
//       if (authListener?.subscription) {
//         authListener.subscription.unsubscribe(); // מנתקים את ה-listener
//         console.log("useAuthRedirect: Auth listener unsubscribed.");
//       }
//     };
//   }, [router, supabase]); // התלויות של ה-useEffect

//   // ההוק מחזיר את מצב הטעינה
//   return isLoadingAuth;
// };
