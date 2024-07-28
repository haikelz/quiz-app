import { useTitle } from "@/hooks";
import { SignUp as SignedUp } from "@clerk/clerk-react";

export default function SignUp() {
  useTitle("Sign Up");

  return (
    <SignedUp routing="path" path="/auth/sign-up" signInUrl="/auth/sign-in" />
  );
}
