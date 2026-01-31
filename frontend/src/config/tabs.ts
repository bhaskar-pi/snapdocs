import { FileText, FolderOpen, LayoutDashboard, Settings } from "lucide-react";

import { SCREEN_PATHS } from "@/types/enums/paths";

export const SIDEBAR_TABS = [
  {
    id: 1,
    title: "Dashboard",
    path: SCREEN_PATHS.DASHBOARD,
    isActive: (pathName: string) => pathName.startsWith(SCREEN_PATHS.DASHBOARD),
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Documents Request",
    path: SCREEN_PATHS.DOCUMENTS_REQUEST,
    isActive: (pathName: string) =>
      pathName.startsWith(SCREEN_PATHS.DOCUMENTS_REQUEST),
    icon: FileText,
  },
  {
    id: 3,
    title: "Clients",
    path: SCREEN_PATHS.CLIENTS,
    isActive: (pathName: string) => pathName.startsWith(SCREEN_PATHS.CLIENTS),
    icon: FileText,
  },

  {
    id: 4,
    title: "Templates",
    path: SCREEN_PATHS.TEMPLATES,
    isActive: (pathName: string) => pathName.startsWith(SCREEN_PATHS.TEMPLATES),
    icon: FolderOpen,
  },

  {
    id: 5,
    title: "Settings",
    path: SCREEN_PATHS.SETTINGS,
    isActive: (pathName: string) => pathName.startsWith(SCREEN_PATHS.SETTINGS),
    icon: Settings,
  },
];
