import React, { useState } from "react";
import {
  UserOutlined,
  ShoppingOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Drawer } from "antd";
import "./Navbar.css";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

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
          Browse Genres
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
        <UserOutlined className="icon" />
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
