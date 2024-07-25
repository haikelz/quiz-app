import { useTitle } from "@/hooks";
import { SignIn as RedirectSignIn } from "@clerk/clerk-react";

export default function SignIn() {
  useTitle("Sign In");

  return <RedirectSignIn path="/auth/sign-in" />;
}
