import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Appfooter from "./footer/Footer";
const { Content, Footer } = Layout;
const AppLayout = () => {
  const location = useLocation();

  console.log(location?.pathname != "/signin");

  return (
    <Layout
      style={{
        minHeight: "100dvh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // overFlow: "hidden",
      }}
    >
      <Layout
        style={{
          maxWidth: "430px",
          width: "100%",
          height: "100dvh",
        }}
      >
        {/* <Layout> */}
        {/* <Content> */}
        <div
          id="detail"
          style={{
            height:
              location?.pathname === "/" ||
              location?.pathname === "/signin" ||
              location?.pathname === "/forgetpassword"
                ? "100%"
                : "88%",
          }}
        >
          <Outlet />
        </div>
        {/* </Content> */}
        {location?.pathname === "/" ||
        location?.pathname === "/signin" ||
        location?.pathname === "/forgetpassword" ? null : (
          <Footer
            style={{
              width: "100%",
              height: "12%",
              padding: "0px",
            }}
          >
            <Appfooter />
          </Footer>
        )}
        {/* </Layout> */}
      </Layout>
    </Layout>
  );
};
export default AppLayout;
2;
