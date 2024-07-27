import { SignUp as SignedUp } from "@clerk/clerk-react";

export default function SignUp() {
  return (
    <SignedUp routing="path" path="/auth/sign-up" signInUrl="/auth/sign-in" />
  );
}
