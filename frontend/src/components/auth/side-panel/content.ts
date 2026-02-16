import { FolderOpen } from "lucide-react";

import type { AuthInfoContent } from "./content.types";

export const AUTH_INFO_CONTENT: Record<
  AuthInfoContent["type"],
  AuthInfoContent
> = {
  login: {
    type: "login",
    title: "Collect client documents effortlessly",
    subtitle:
      "Streamline your document collection workflow with a secure, professional platform built for modern practices.",
    features: [
      "Secure document uploads with end-to-end encryption",
      "Track pending and overdue requests in real time",
      "Centralized document management dashboard",
    ],
    trust: {
      icon: FolderOpen,
      title: "Trusted by professionals",
      subtitle: "3,500+ documents collected monthly",
    },
  },
};
