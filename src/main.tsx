import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { queryClient } from "./lib/queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components/ToastProvider.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastProvider />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
