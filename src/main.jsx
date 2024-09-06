import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./lib/apollo";
import ReactDOM from "react-dom/client";
import Forms from "./forms.jsx";
import Obras from "./obras.jsx";
import Generica from "./generica";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Obras />,
  },

  {
    path: "/generica",
    element: <Generica />,
  },
  {
    path: "forms/:id",
    element: <Forms />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);
