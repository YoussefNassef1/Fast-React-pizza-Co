import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import { menuLoader, orderLoader } from "./utils/loader.js";
import { createOrderAction, updateOrderAction } from "./utils/action.js";
import Error from "./ui/Error.jsx";
import Order from "./features/order/Order";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action:updateOrderAction
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
