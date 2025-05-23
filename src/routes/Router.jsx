import { createBrowserRouter } from "react-router-dom";
import LazyComponent from "./LazyComponent";
import AppLayout from "../layout/Layout";
// import AppLayout from "../layout/Layout";
// import LazyComponent from "./LazyComponent";
// import ErrorScreen from "../pages/error/ErrorScreen";
// import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // Uncomment PrivateRoute when it's ready
      // <PrivateRoute>
      <AppLayout />
      // </PrivateRoute>
    ),
    errorElement: <div>Something went wrong</div>,
    children: [
      // dashboard route
      {
        path: "/",
        element: <LazyComponent path="/" />,
      },
      {
        path: "/signin",
        element: <LazyComponent path="/signin" />,
      },
      {
        path: "/forgetpassword",
        element: <LazyComponent path="/forgetpassword" />,
      },
      {
        path: "/thehive",
        element: <LazyComponent path="/thehive" />,
      },
      {
        path: "/you",
        element: <LazyComponent path="/you" />,
      },
      {
        path: "/chase",
        element: <LazyComponent path="/chase" />,
      },
      {
        path: "/chases/:id",
        element: <LazyComponent path="/chases" />,
      },
      {
        path: "/history",
        element: <LazyComponent path="/history" />,
      },
    ],
  },
  // auth route
  //   {
  //     path: "/login",
  //     element: <LazyComponent path="/login" />,
  //   },
]);
