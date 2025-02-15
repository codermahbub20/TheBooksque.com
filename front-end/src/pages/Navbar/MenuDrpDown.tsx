import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { UserRound } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const menuItems = {
  ADMIN: [
    { key: "/profile", label: "Profile" },
    { key: "/users", label: "Users" },
    { key: "/all-products", label: "Manage Products" },
    { key: "/orders", label: "Orders" },
  ],
  CUSTOMER: [
    { key: "/profile", label: "Profile" },
    { key: "/my-orders", label: "My Orders" },
  ],
};

const MenuDrpDown = () => {
  const user = useAppSelector(selectCurrentUser);

  // Select menu items based on user role
  const role = user?.role?.toUpperCase(); // Ensure it's uppercase to match menuItems keys
  const selectedItems =
    menuItems[role as keyof typeof menuItems] || menuItems.CUSTOMER;

  // Convert items to Ant Design menu format
  const menuData: MenuProps["items"] = selectedItems.map((item) => ({
    key: item.key,
    label: <a href={item.key}>{item.label}</a>,
  }));

  return (
    <Dropdown menu={{ items: menuData }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <UserRound />
        </Space>
      </a>
    </Dropdown>
  );
};

export default MenuDrpDown;
