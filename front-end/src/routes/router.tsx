import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../component/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
]);

export default router;
