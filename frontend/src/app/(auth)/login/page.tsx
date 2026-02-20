import LoginPanel from "@/components/auth/side-panel/login-panel";
import { AuthLayout } from "@/components/layouts/auth-layout";

import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <AuthLayout type="login" right={<LoginForm />} left={<LoginPanel />} />
  );
};

export default LoginPage;
