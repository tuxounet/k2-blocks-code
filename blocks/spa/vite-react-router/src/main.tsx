import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

<% for(const route of routes) { %>import <%= route.element %> from "./routes/<%= route.element %>";
<% } %>


const router = createBrowserRouter([
  <% for(const route of routes) { %>
  {
    path: "<%= route.path%>",
    element: <<%= route.element%> />,
  },
  <% } %>
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
