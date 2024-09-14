// components/Layout.js
import NavBar2 from "./HomeComponents/FloatingDockMobile";

const Layout = ({ children }) => {
  return (
    <div className="">
      {/* <Navbar /> */}
      <NavBar2/>
      <main style={mainStyle}>{children}</main>
    </div>
  );
};

const mainStyle = {
  padding: "0px",
};

export default Layout;
