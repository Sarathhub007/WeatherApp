import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Navbar will be displayed on every page */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
