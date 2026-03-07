import { createBrowserRouter } from "react-router-dom";
import Root from "./Pages/Root";
import Dashboard from "./Pages/Dashbord";
import History from "./Pages/History";
import Location from "./Pages/Location";
import StoreList from "./Pages/Storelist";
import Customer from "./Pages/Customer";
import Display from "./Pages/Display";
import TokenSuccess from "./Pages/TokenSucc";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "history", element: <History /> },
      { path: "location", element: <Location /> },
      { path: "stores/:storeType", element: <StoreList /> },
      { path: "customer", element: <Customer /> },
      { path: "display", element: <Display /> },
      { path: "token-success/:tokenId", element: <TokenSuccess /> },
    ],
  },
]);