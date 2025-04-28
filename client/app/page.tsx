"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button onClick={handleClick} isLoading={isLoading}>
        Click me
      </Button>
    </div>
  );
}
