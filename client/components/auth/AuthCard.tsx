'use client'

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface AuthCardProps {
  children: React.ReactNode;
  backButtonHref: string;
  backButtonLabel: string;
  headerLabel: string;
  className?: string;
}

const AuthCard = ({
  backButtonHref,
  backButtonLabel,
  children,
  headerLabel,
  className,
}: AuthCardProps) => {
  return (
    <Card className={cn("w-[400px] shadow-md", className)}>
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className="text-3xl font-semibold">🔐SecureShare</h1>
          <p className="text-muted-foreground text-sm">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button
          variant="link"
          className="font-normal w-full"
          size={"sm"}
          asChild
        >
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
