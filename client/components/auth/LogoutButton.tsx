"use client";

import { Logout } from "@/action/auth-handler";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    Logout();
  };
  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default LogoutButton;
