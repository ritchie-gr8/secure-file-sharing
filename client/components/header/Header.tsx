"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="flex justify-between items-center p-3 bg-slate-900 text-white">
      <div className="text-2xl font-bold">
        <Link href={"/"}>SecureShare</Link>
      </div>
      <nav className="space-x-4">
        <Link
          href={"/upload"}
          className={cn(pathName === "/upload" ? "underline" : "no-underline")}
        >
          Upload file
        </Link>

        <Link
          href={"/receive"}
          className={cn(pathName === "/receive" ? "underline" : "no-underline")}
        >
          Recieve file
        </Link>
        <Link
          href={"/profile"}
          className={cn(pathName === "/profile" ? "underline" : "no-underline")}
        >
          Profile Management
        </Link>
      </nav>

      <div>
        <LogoutButton>Logout</LogoutButton>
      </div>
    </header>
  );
};

export default Header;
