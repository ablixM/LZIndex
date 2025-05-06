import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatPage from "./pages/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

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
