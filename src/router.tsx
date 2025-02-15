import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import ChatPage from "./pages/ChatPage";
import PromptPage from "./pages/PromptPage";
import AboutPage from "./pages/AboutPage";
import AttributionPage from "./pages/AttributionPage";
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

      {
        path: "/prompt",
        element: <PromptPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/attributions",
        element: <AttributionPage />,
      },
    ],
  },
]);

export default router;
