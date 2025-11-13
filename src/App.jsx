import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    // This function runs once when your app component first loads

    // Check if the window.Telegram.WebApp object is available
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;

      // 1. Tell Telegram that your app is ready to be displayed
      webApp.ready();

      // 2. Command Telegram to expand the app to full height
      webApp.expand();

      console.log("Telegram Web App is ready and expanded.");
    }
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
