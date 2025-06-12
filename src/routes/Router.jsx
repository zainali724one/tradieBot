import { createBrowserRouter } from "react-router-dom";

import LazyComponent from "./LazyComponent";
import AppLayout from "../layout/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

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
        element: (
          <PublicRoute>
            <LazyComponent path="/" />
          </PublicRoute>
        ),
        // element: <LazyComponent path="/" />,
      },
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <LazyComponent path="/signin" />
          </PublicRoute>
        ),
        // element: <LazyComponent path="/signin" />,
      },
      {
        path: "/forgetpassword",
        element: (
          <PublicRoute>
            <LazyComponent path="/forgetpassword" />
          </PublicRoute>
        ),
        // element: <LazyComponent path="/forgetpassword" />,
      },

      {
        path: "/quoteform",
        element: (
          <PrivateRoute>
            <LazyComponent path="/quoteform" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/quoteform" />,
      },
      {
        path: "/editname",

        // element: <LazyComponent path="/editname" />,
        element: (
          <PrivateRoute>
            <LazyComponent path="/editname" />
          </PrivateRoute>
        ),
      },

      {
        path: "/editemail",

        // element: <LazyComponent path="/editemail" />,
        element: (
          <PrivateRoute>
            <LazyComponent path="/editemail" />
          </PrivateRoute>
        ),
      },
      {
        path: "/editphonenumber",

        // element: <LazyComponent path="/editphonenumber" />,
        element: (
          <PrivateRoute>
            <LazyComponent path="/editphonenumber" />
          </PrivateRoute>
        ),
      },
      {
        path: "/changepassword",

        element: (
          <PrivateRoute>
            <LazyComponent path="/changepassword" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/changepassword" />,
      },
      {
        path: "/termsandcondition",
        element: <LazyComponent path="/termsandcondition" />,
      },
      {
        path: "/chase",
        element: (
          <PrivateRoute>
            <LazyComponent path="/chase" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/chase" />,
      },
      {
        path: "/chases/:id",
        element: (
          <PrivateRoute>
            <LazyComponent path="/chases" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/chases" />,
      },
      {
        path: "/history",
        element: (
          <PrivateRoute>
            <LazyComponent path="/history" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/history" />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <LazyComponent path="/profile" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/profile" />,
      },
      {
        path: "/editprofile",
        element: (
          <PrivateRoute>
            <LazyComponent path="/editprofile" />
          </PrivateRoute>
        ),
      },

      {
        path: "/schedule",
        element: (
          <PrivateRoute>
            <LazyComponent path="/schedule" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/schedule" />,
      },
      {
        path: "/invoice",

        element: (
          <PrivateRoute>
            <LazyComponent path="/invoice" />
          </PrivateRoute>
        ),
        // element: <LazyComponent path="/invoice" />,
      },

      {
        path: "/verifyotp",
        element: (
          <PublicRoute>
            <LazyComponent path="/verifyotp" />
          </PublicRoute>
        ),
        // element: <LazyComponent path="/verifyotp" />,
      },
      {
        path: "/resetpassword",
        element: (
          <PublicRoute>
            <LazyComponent path="/resetpassword" />
          </PublicRoute>
        ),
        // element: <LazyComponent path="/resetpassword" />,
      },
    ],
  },
  // auth route
  //   {
  //     path: "/login",
  //     element: <LazyComponent path="/login" />,
  //   },
]);
