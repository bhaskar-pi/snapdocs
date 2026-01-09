import { AuthInfoPanel } from "@/components/auth/auth-info-panel";
import SignUpForm from "@/components/auth/signup-form";
import { AuthLayout } from "@/components/layouts/auth-layout";

const SignUp = () => {
  return (
    <AuthLayout left={<SignUpForm />} right={<AuthInfoPanel type="signup" />} />
  );
};

export default SignUp;
