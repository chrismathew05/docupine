import { Download, Code, Inbox, CreditCard, SquarePen } from "lucide-react";
import { LucideIcon } from "lucide-react";

// used to populate sidebar nav
interface SidebarItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  {
    title: "Create Job",
    url: "/create",
    icon: SquarePen,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: Inbox,
  },
  {
    title: "Saved Flows",
    url: "/flows",
    icon: Download,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "Developer",
    url: "/developer",
    icon: Code,
  },
];
