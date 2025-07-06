import { Download, Code, Inbox, CreditCard, SquarePen } from "lucide-react";

// Sidebar menu items
export const sidebarItems = [
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
