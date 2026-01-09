import type { LucideIcon } from "lucide-react";

export type BadgeVariant =
  | "neutral"
  | "neutralL"
  | "success"
  | "warning"
  | "info"
  | "light"
  | "error";

export interface BadgeItem {
  icon: LucideIcon;
  variant: BadgeVariant;
}

export interface Review {
  quote: string;
  author: string;
  role: string;
}

export interface LoginAuthInfo {
  type: "login";
  badges: BadgeItem[];
  title: string;
  subtitle: string;
  features: string[];
  trust: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
  };
}

export interface SignupAuthInfo {
  type: "signup";
  badges: BadgeItem[];
  title: string;
  subtitle: string;
  features: string[];
  reviews: Review[];
}

export type AuthInfoContent = LoginAuthInfo | SignupAuthInfo;
export type AuthInfoVariant = AuthInfoContent["type"];
