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
        path: "/quoteform",
        element: <LazyComponent path="/quoteform" />,
      },
      {
        path: "/editname",
        element: <LazyComponent path="/editname" />,
      },

      {
        path: "/editemail",
        element: <LazyComponent path="/editemail" />,
      },
      {
        path: "/editphonenumber",
        element: <LazyComponent path="/editphonenumber" />,
      },
      {
        path: "/changepassword",
        element: <LazyComponent path="/changepassword" />,
      },
      {
        path: "/termsandcondition",
        element: <LazyComponent path="/termsandcondition" />,
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
      {
        path: "/profile",
        element: <LazyComponent path="/profile" />,
      },
    ],
  },
  // auth route
  //   {
  //     path: "/login",
  //     element: <LazyComponent path="/login" />,
  //   },
]);
