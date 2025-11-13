import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import Shop from "../pages/public/Shop";

const router = createBrowserRouter([
  // public
  { path: "/", element: <HomePage /> },
  { path: "shop", element: <Shop /> },
]);

export default function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
