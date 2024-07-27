import { useUser } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Homepage from "./pages/Home";
import Quiz from "./pages/Quiz";

export default function App() {
  const queryClient = new QueryClient();
  const { isSignedIn } = useUser();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <main className="flex justify-center items-center w-full">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/quiz"
            element={isSignedIn ? <Quiz /> : <Navigate to="/" />}
          />
          <Route
            path="/auth/sign-in"
            element={isSignedIn ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/auth/sign-up"
            element={isSignedIn ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </main>
    </QueryClientProvider>
  );
}
