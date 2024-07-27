import { SignIn as SignedIn } from "@clerk/clerk-react";

export default function SignIn() {
  return (
    <SignedIn routing="path" path="/auth/sign-in" signUpUrl="/auth/sign-up" />
  );
}
