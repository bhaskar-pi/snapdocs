import type { LucideIcon } from "lucide-react";

export interface LoginAuthInfo {
  type: "login";
  title: string;
  subtitle: string;
  features: string[];
  trust: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
  };
}

export type AuthInfoContent = LoginAuthInfo;
export type AuthInfoVariant = AuthInfoContent["type"];
