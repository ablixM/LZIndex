import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
