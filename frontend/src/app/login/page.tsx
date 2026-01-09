import { AuthLayout } from "@/components/layouts/auth-layout/auth-layout";
import Login from "./login";
import { LoginInfo } from "./login-info";

const LoginPage = () => {
  return <AuthLayout left={<Login />} right={<LoginInfo />} />;
};

export default LoginPage;
