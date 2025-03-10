"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("token", token);
    console.log("role", role);

    if (!token) {
      router.replace("/sign-in"); 
      return
    }

    switch (role) {
        case "TEACHER":
            router.replace("/teacher");
            break;
    
        case "STUDENT":
            router.replace("/student");
            break;
        
        case "MASTER":
            router.replace("/admin");
            break;
        
        default:
            router.replace("/sign-in");
            break;
    }

  }, [router]);
}
