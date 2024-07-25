import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import SignIn from "./pages/Auth/SignIn";
import Homepage from "./pages/Home";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <main className="flex justify-center items-center w-full p-4">
        <Routes>
          <Route
            path="/"
            element={
              <SignedIn>
                <Homepage />
              </SignedIn>
            }
          />
          <Route
            path="/auth/sign-in"
            element={
              <SignedOut>
                <SignIn />
              </SignedOut>
            }
          />
          <Route path="/questions" />
          <Route path="/questions/:slug" />
        </Routes>
      </main>
    </QueryClientProvider>
  );
}
