import {
  FileText,
  Shield,
  Clock3,
  FolderOpen,
  Users,
  FileCheck,
  Zap,
} from "lucide-react";

import type { AuthInfoContent } from "./content.types";

export const AUTH_INFO_CONTENT: Record<
  AuthInfoContent["type"],
  AuthInfoContent
> = {
  login: {
    type: "login",
    badges: [
      { icon: FileText, variant: "default" },
      { icon: Shield, variant: "negative" },
      { icon: Clock3, variant: "success" },
    ],
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

  signup: {
    type: "signup",
    badges: [
      { icon: FileCheck, variant: "default" },
      { icon: Users, variant: "info" },
      { icon: Zap, variant: "negative" },
    ],
    title: "Built for professionals",
    subtitle:
      "Join thousands of accountants, lawyers, and consultants who trust SnapDocs for their document collection needs.",
    features: [
      "Secure document collection with bank-level security",
      "Client-friendly upload experience, no signup required",
      "Get notified instantly when documents arrive",
    ],
    reviews: [
      {
        quote:
          "SnapDocs cut our document follow-ups by more than half. Clients love how simple it is.",
        author: "Rahul S.",
        role: "Chartered Accountant",
      },
      {
        quote:
          "Finally a clean way to collect files without endless emails and reminders.",
        author: "Anita M.",
        role: "Legal Consultant",
      },
      {
        quote:
          "We onboard clients faster now. Document collection used to be the biggest bottleneck.",
        author: "Vikram P.",
        role: "Tax Advisor",
      },
    ],
  },
};
