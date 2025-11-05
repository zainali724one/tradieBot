import { Suspense, lazy } from "react";

import Loading from "../components/Loading";
// import Loading from "../components/loading/Loading";

const componentMap = {
  // home
  "/": lazy(() => import("../pages/Signup")),
  "/signin": lazy(() => import("../pages/Login")),
  "/forgetpassword": lazy(() => import("../pages/ForgetPassword")),
  "/verifyotp": lazy(() => import("../pages/VerifyOtpScreen")),

  "/resetpassword": lazy(() => import("../pages/ResetPasswordScreen")),

  "/quoteform": lazy(() => import("../pages/QuoteForm")),
  "/editname": lazy(() => import("../pages/EditNameScreen")),
  "/editemail": lazy(() => import("../pages/EditEmailScreen")),
  // VerifyOtpScreen
  "/editphonenumber": lazy(() => import("../pages/EditPhoneNumberScreen")),
  "/changepassword": lazy(() => import("../pages/ChangePasswordScreen")),
  "/termsandcondition": lazy(() => import("../pages/TermsAndConditionsScreen")),

  "/chase": lazy(() => import("../pages/Chase")),
  "/chases": lazy(() => import("../pages/Chases")),
  "/history": lazy(() => import("../pages/History")),
  "/profile": lazy(() => import("../pages/Profile")),
  "/editprofile": lazy(() => import("../pages/EditProfile")),
  "/schedule": lazy(() => import("../pages/ScheduleScreen")),
  "/invoice": lazy(() => import("../pages/InvoiceScreen")),
  "/stripe": lazy(() => import("../pages/Stripe")),
  "/xeroconnected": lazy(() => import("../pages/XeroConnected")), // Route with dynamic params
  "/templateTwo": lazy(() => import("../pages/TemplateTwo")),
  "/templateOne": lazy(() => import("../pages/TemplateOne")),
  "/selectTemp": lazy(() => import("../pages/SelectTemplate")),
  "/editlogo": lazy(() => import("../pages/EditLogoScreen")),

  // "/thehive": lazy(() => import("../pages/TheHive")),
  // "/you": lazy(() => import("../pages/You")),
};

const LazyComponent = ({ path }) => {
  const Component = componentMap[path];
  if (!Component) {
    return <div>Component not found</div>;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
