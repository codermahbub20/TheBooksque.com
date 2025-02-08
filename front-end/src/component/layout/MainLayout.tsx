import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      Hello Bangladesh
      <Outlet />
    </div>
  );
};

export default MainLayout;
