import { Suspense, lazy } from "react";
import Loading from "../components/Loading";
// import Loading from "../components/loading/Loading";

const componentMap = {
  // home
  "/": lazy(() => import("../pages/Signup")),
  "/signin": lazy(() => import("../pages/Login")),
  "/forgetpassword": lazy(() => import("../pages/ForgetPassword")),
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
