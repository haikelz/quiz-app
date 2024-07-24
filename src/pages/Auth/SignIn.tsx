import { SignIn as RedirectSignIn } from "@clerk/clerk-react";

export default function SignIn() {
  return <RedirectSignIn path="/auth/sign-in" />;
}
