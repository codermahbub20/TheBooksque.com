import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../component/layout/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import AllProductsPage from "../pages/AllProducts/AllProduct";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignUp />,
  },
]);

export default router;
