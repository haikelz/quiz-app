import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { env } from "./lib/utils.ts";
import { ClerkProvider } from "@clerk/clerk-react";

const { CLERK_PUBLISHABLE_KEY } = env;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        afterSignOutUrl="/auth/sign-in"
        signUpForceRedirectUrl="/auth/sign-in"
        signInForceRedirectUrl="/"
      >
        <Provider>
          <App />
        </Provider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
