import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "antd";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleProductQuery(
    productId as string, {
        skip: !productId,
      }
  );
  const product = data?.data;
  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={12} lg={10} xl={8}>
          <Card
            cover={
                <img
                src="https://res.cloudinary.com/dl5rlskcv/image/upload/v1735927164/default-product_o9po6f.jpg"
                alt="No Image Available"
                className="w-16 h-16 opacity-50"
              />
            }
          >
            <h2>{product.title}</h2>
            <p>
              <strong>Author:</strong> {product.author}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <Button
              type="primary"
              block
              disabled={!product.inStock}
              onClick={() => navigate(`/checkout/${product._id}`)}
            >
              Buy Now
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailsPage;
