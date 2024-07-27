import { env } from "@/lib/utils";
import { ChildrenProps } from "@/types";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "jotai";
import { useNavigate } from "react-router-dom";

const { CLERK_PUBLISHABLE_KEY } = env;

export default function RootLayout({ children }: ChildrenProps) {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <Provider>{children}</Provider>
    </ClerkProvider>
  );
}
