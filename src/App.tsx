import { SignedIn } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Homepage from "./pages/Home";
import Quiz from "./pages/Quiz";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <main className="flex justify-center items-center w-full">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/quiz"
            element={
              <SignedIn>
                <Quiz />
              </SignedIn>
            }
          />
          <Route path="/questions" />
          <Route path="/questions/:slug" />
        </Routes>
      </main>
    </QueryClientProvider>
  );
}
