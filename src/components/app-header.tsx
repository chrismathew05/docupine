"use client";

import { UserButton } from "@clerk/nextjs";
import { sidebarItems } from "@/lib/actions";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Only show UserButton after client-side hydration is complete
  useEffect(() => {
    setMounted(true);
  }, []);

  // Find the title that matches the current pathname
  const currentPageTitle =
    sidebarItems.find((item) => item.url === pathname)?.title || "Home";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <div className="text-sm text-muted-foreground">{currentPageTitle}</div>
      <div className="ml-auto">{mounted ? <UserButton /> : null}</div>
    </header>
  );
}
