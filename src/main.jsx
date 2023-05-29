import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Forms from "./forms.jsx";
import Obras from "./obras.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Obras />,
  },
  {
    path: "forms/:id",
    element: <Forms />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
