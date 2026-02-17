export interface PageHeaderAction {
  label: string;
  path?: string;
  onClick?: () => void;
  intent?: "primary" | "secondary" | "success" | "warning" | "negative";
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}
