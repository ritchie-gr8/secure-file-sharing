"use client";

import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    signOut({ redirectTo: "/login" });
  }, []);
  return (
    <>
      Logging out <Loader2 className="ml-2 animate-spin" />
    </>
  );
};

export default LogoutPage;
