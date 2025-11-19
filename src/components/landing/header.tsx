"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/logo";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-center px-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
}
