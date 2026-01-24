import { FileText, FolderOpen, LayoutDashboard, Settings } from "lucide-react";

export const SIDEBAR_TABS = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    isActive: (pathName: string) => pathName.startsWith("/dashboard"),
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Client Requests",
    path: "/client-requests",
    isActive: (pathName: string) => pathName.startsWith("/clients"),
    icon: FileText,
  },
  {
    id: 3,
    title: "Templates",
    path: "/templates",
    isActive: (pathName: string) => pathName.startsWith("/templates"),
    icon: FolderOpen,
  },

  {
    id: 4,
    title: "Settings",
    path: "/settings",
    isActive: (pathName: string) => pathName.startsWith("/settings"),
    icon: Settings,
  },
];
