import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import LoginForm from "@/components/auth/login-form";
import { AuthLayout } from "@/components/layouts/auth-layout";

const LoginPage = () => {
  return (
    <AuthLayout right={<LoginForm />} left={<AuthSidePanel type="login" />} />
  );
};

export default LoginPage;
