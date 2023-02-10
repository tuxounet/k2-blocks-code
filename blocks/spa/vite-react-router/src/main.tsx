import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "./contexts/config/ConfigContext";
import ErrorBoundary from "./contexts/ErrorBoundary";
import AuthCallback from "./routes/AuthCallback";

<% for(const route of routes) { %>import <%= route.element %> from "./routes/<%= route.element %>";
<% } %>


const router = createBrowserRouter([
  {
    path:"/callback", 
    element: <AuthCallback />
  },
  <% for(const route of routes) { %>
  {
    path: "<%= route.path%>",
    element: <<%= route.element%> />,
  },
  <% } %>
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
