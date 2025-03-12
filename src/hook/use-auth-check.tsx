"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.replace("/sign-in");
    }

    const roleFormat = role?.replace(/"/g, "");
    console.log("roleFormat", roleFormat)
    console.log("MASTER")

    if (roleFormat) {
      let redirectPath = "/sign-in"; 
      switch (roleFormat) {
        case "TEACHER":
          redirectPath = "/teacher";
          break;
        case "STUDENT":
          redirectPath = "/student";
          break;
        case "MASTER":
          redirectPath = "/admin";  
          break;

        default :
            redirectPath = "/sign-in";
      }

      console.log("redirect path", redirectPath)
      if (window.location.pathname !== redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [router]);
}
