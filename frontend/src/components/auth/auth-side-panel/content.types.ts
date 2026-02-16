import type { LucideIcon } from "lucide-react";

export interface Review {
  quote: string;
  author: string;
  role: string;
}

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

export interface SignupAuthInfo {
  type: "signup";
  title: string;
  subtitle: string;
  features: string[];
  reviews: Review[];
}

export type AuthInfoContent = LoginAuthInfo | SignupAuthInfo;
export type AuthInfoVariant = AuthInfoContent["type"];
