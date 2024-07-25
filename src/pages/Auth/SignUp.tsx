import { useTitle } from "@/hooks";
import { SignUp as RedirectSignUp } from "@clerk/clerk-react";

export default function SignUp() {
  useTitle("Sign Up");

  return <RedirectSignUp path="/auth/sign-up" />;
}
