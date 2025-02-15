import { useState } from "react";
import {
  // UserOutlined,
  ShoppingOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import "./Navbar.css";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

import { Link } from "react-router-dom";
import MenuDrpDown from "./MenuDrpDown";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const token = useAppSelector(useCurrentToken);
  console.log(token);

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <img
          src="https://dt-booksque.myshopify.com/cdn/shop/files/logo.png?v=1666181538&width=230"
          alt="Logo"
        />
      </div>

      {/* Desktop Menu */}
      <div className="menu">
        <a href="/" className="nav-link">
          All Books
        </a>
        <a href="/" className="nav-link">
          New Releases
        </a>
        <a href="/" className="nav-link">
          Best Sellers
        </a>
        <a href="/" className="nav-link">
          Audio Format
        </a>
      </div>

      {/* Icons & Mobile Menu */}
      <div className="icons">
        {token ? (
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end">
            <MenuDrpDown />
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-2">
            <Link to="/login">
              <Button className="text-sm font-semibold text-gray-900">
                Log in
              </Button>
            </Link>
            <Link to="/signin" className="ml-4">
              <Button>Sign up</Button>
            </Link>
          </div>
        )}
        <ShoppingOutlined className="icon" />
        <MenuOutlined className="menu-icon" onClick={() => setVisible(true)} />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setVisible(false)}
        visible={visible}
        closeIcon={<CloseOutlined />}
      >
        <a href="/" className="drawer-link">
          Browse Genres
        </a>
        <a href="/" className="drawer-link">
          New Releases
        </a>
        <a href="/" className="drawer-link">
          Best Sellers
        </a>
        <a href="/" className="drawer-link">
          Audio Format
        </a>
      </Drawer>
    </div>
  );
};

export default Navbar;
