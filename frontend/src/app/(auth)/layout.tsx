import { AuthBootstrap } from "@/components/auth/auth-bootstrap";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthBootstrap />
      {children}
    </>
  );
}
