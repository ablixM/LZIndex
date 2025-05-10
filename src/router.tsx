import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatPage from "./pages/ChatPage";

// Global Error Page component
const ErrorPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Oops!</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Something went wrong. Please try again later.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </a>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat" replace />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
    ],
  },
]);

export default router;
