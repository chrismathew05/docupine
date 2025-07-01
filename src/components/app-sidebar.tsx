import { Download, Code, Inbox, CreditCard, SquarePen } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Create Job",
    url: "#",
    icon: SquarePen,
  },
  {
    title: "Jobs",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Saved Flows",
    url: "#",
    icon: Download,
  },
  {
    title: "Billing",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Developer",
    url: "#",
    icon: Code,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-xl font-semibold">Docupine</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
