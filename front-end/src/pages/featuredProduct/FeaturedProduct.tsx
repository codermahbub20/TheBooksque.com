import React from "react";
import { Button, Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductCard from "../../component/ui/ProductCard";
import { Book } from "../../types/book.type";

import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const FeaturedProducts: React.FC = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 4,
    inStock: true,
  });

  console.log(productsData);

  const products = productsData?.data || [];
  return (
    <section className="bg-white text-gray-900">
      {/* Section Title */}
      <div style={{ alignItems: "center" }} id="featured-products">
        <Title
          style={{ fontSize: "40px", textAlign: "center", marginTop: "20px" }}
          level={2}
          className="!text-4xl !font-bold !text-[#18181b]"
        >
          Featured Bicycles
        </Title>
        <Paragraph
          style={{ fontSize: "20px", textAlign: "center", marginTop: "20px" }}
        >
          Discover the latest premium bicycles designed for performance.
        </Paragraph>
      </div>

      {/* Product Grid */}
      <Spin spinning={isLoading}>
        <Row
          gutter={[16, 16]}
          style={{ paddingLeft: "30px", paddingRight: "30px" }}
        >
          {products?.map((product: Book) => (
            <Col key={product?._id} xs={12} sm={12} md={6} lg={6} xl={6}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        {/* View More Button */}
        <Link to={"/products"} className="mt-8 flex justify-center">
          <Button
            block
            size="large"
            style={{
              width: "200px",
              backgroundColor: "#b89579",
              color: "white",
              marginTop: "20px",
              marginBottom: "20px",
              margin: "auto",
              display: "flex",
              top: "2",
            }}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg font-semibold bg-[#b89579] text-white transition-all hover:bg-[#a48d70]"
          >
            View More
          </Button>
        </Link>
      </Spin>
    </section>
  );
};

export default FeaturedProducts;
