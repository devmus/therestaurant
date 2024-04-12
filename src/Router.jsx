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
    path: "/therestaurant/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/therestaurant/", index: true, element: <Home /> },
      { path: "/therestaurant/thankyou", element: <Thankyou /> },
      { path: "/therestaurant/booking", element: <Booking /> },
      { path: "/therestaurant/admin", element: <Admin /> },
      { path: "/therestaurant/contact", element: <Contact /> },
      { path: "/therestaurant/datakeep", element: <DataKeep /> },
    ],
  },
]);
