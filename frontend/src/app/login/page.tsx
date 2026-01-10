import { AuthInfoPanel } from "@/components/auth/auth-info-panel";
import LoginForm from "@/components/auth/login-form";
import { AuthLayout } from "@/components/layouts/auth-layout";

const LoginPage = () => {
  return (
    <AuthLayout left={<LoginForm />} right={<AuthInfoPanel type="login" />} />
  );
};

export default LoginPage;
