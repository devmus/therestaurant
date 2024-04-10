import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { Thankyou } from "./pages/Thankyou";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { DataKeep } from "./pages/DataKeep";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/thankyou", element: <Thankyou /> },
      { path: "booking", element: <Booking /> },
      { path: "admin", element: <Admin /> },
      { path: "contact", element: <Contact /> },
      { path: "datakeep", element: <DataKeep /> },
    ],
  },
]);
