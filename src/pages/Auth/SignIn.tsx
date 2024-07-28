import { useTitle } from "@/hooks";
import { SignIn as SignedIn } from "@clerk/clerk-react";

export default function SignIn() {
  useTitle("Sign In");

  return (
    <SignedIn routing="path" path="/auth/sign-in" signUpUrl="/auth/sign-up" />
  );
}
