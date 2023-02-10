import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "./contexts/config/ConfigContext";
import ErrorBoundary from "./contexts/ErrorBoundary";
import AuthCallback from "./routes/AuthCallback";
import { AuthPrivate } from "./contexts/authentication/AuthPrivate";
import { AuthProvider } from "./contexts/authentication/AuthContext";

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
    <%if(route.security ==="public" ) { %>
    element: <<%= route.element%> />,
    <% } %>
    <%if(route.security !=="public" ) { %>
    element: <AuthPrivate><<%= route.element%> /></AuthPrivate>,
    <% } %>
  },
  <% } %>
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ConfigProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
