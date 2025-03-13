"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (!token) {
      router.replace("/sign-in");
    }

    const roleFormat = role?.replace(/"/g, "");
    const formatUsserId = userId?.replace(/"/g, "");

    if (roleFormat) {
      let redirectPath = "/sign-in"; 
      switch (roleFormat) {
        case "TEACHER":
          redirectPath = `/teacher/${formatUsserId}`;
          break;
        case "STUDENT":
          redirectPath = `/student/${formatUsserId}`;
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
