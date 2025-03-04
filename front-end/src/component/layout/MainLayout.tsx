import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../pages/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
