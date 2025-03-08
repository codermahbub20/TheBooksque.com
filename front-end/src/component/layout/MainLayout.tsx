import { Outlet } from "react-router-dom";
// import Navbar from "../../pages/Navbar/Navbar";
import Footer from "../../pages/footer/Footer";
import Header from "../../pages/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
