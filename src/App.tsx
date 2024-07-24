import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/questions" />
        <Route path="/questions/:slug" />
      </Routes>
    </QueryClientProvider>
  );
}
