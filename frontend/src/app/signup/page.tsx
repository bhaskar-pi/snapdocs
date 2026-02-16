import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import SignUpForm from "@/components/auth/signup-form";
import { AuthLayout } from "@/components/layouts/auth-layout";

const SignUp = () => {
  return (
    <AuthLayout left={<SignUpForm />} right={<AuthSidePanel type="signup" />} />
  );
};

export default SignUp;
