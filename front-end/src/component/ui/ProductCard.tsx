import React from "react";
import { Card, Button, Tag } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

interface ProductProps {
  product: {
    _id: string;
    title: string;
    author: string;
    price: number;
    product_model: string;
    image?: string;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean;
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  let role = null;

  if (token) {
    const user = verifyToken(token as string);
    role = user?.role;
  }

  return (
    <Card
      hoverable
      className="rounded-xl border border-gray-200 shadow-sm"
      onClick={() => navigate(`/products/${product?._id}`)}
    >
      {/* Product Image or Placeholder */}
      <div className="relative flex justify-center items-center bg-gray-100 rounded-lg aspect-square">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-500">
            <img
              src="https://res.cloudinary.com/dl5rlskcv/image/upload/v1735927164/default-product_o9po6f.jpg"
              alt="No Image Available"
              className="w-16 h-16 opacity-50"
            />
            <p className="text-xs font-medium">NO IMAGE AVAILABLE</p>
          </div>
        )}

        {/* Stock Status */}
        {product.inStock ? (
          <Tag color="green" className="absolute top-2 right-2">
            In Stock
          </Tag>
        ) : (
          <Tag color="red" className="absolute top-2 right-2">
            Out of Stock
          </Tag>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500">
          {product.author} | {product.category}
        </p>
        <p className="text-xl font-bold text-[#b89579] mt-1">
          ${product.price}
        </p>
      </div>

      {/* Buy Now Button */}
      <Button
        block
        icon={<ShoppingOutlined />}
        size="large"
        className={`mt-3 rounded-lg font-semibold ${
          product.inStock
            ? "bg-[#b89579] text-white hover:bg-[#a48d70]"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!product.inStock}
        onClick={(e) => {
          e.stopPropagation();
          if (!token) {
            toast.message("Please login to buy products", {
              description: "You need to login to buy products",
              action: {
                label: "Login",
                onClick: () => {
                  navigate(
                    `/login?next=/checkout?product=${product._id}&quantity=1`
                  );
                },
              },
            });
            return;
          }

          if (role === "ADMIN") {
            toast.message("Admins can't buy products", {
              description: "Please login as a customer to buy products",
            });
          } else {
            navigate(`/checkout?product=${product._id}&quantity=1`);
          }
        }}
      >
        Buy Now
      </Button>
    </Card>
  );
};

export default ProductCard;
