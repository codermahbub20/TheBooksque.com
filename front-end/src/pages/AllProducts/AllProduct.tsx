/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Input, Select, Row, Col, Slider, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductCard from "../../component/ui/ProductCard";
import { Book } from "../../types/book.type";

const { Option } = Select;

const AllProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: productsData } = useGetProductsQuery({
    page: currentPage,
    limit: pageSize,
    inStock:
      availability === "InStock"
        ? true
        : availability === "OutStock"
        ? false
        : undefined,
  });

  let products = productsData?.data || [];

  products = products
    .filter(
      (product: Book) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product: Book) =>
      category ? product.category === category : true
    )
    .filter(
      (product: Book) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a: Book, b: Book) =>
      (a[sortBy as keyof Book] as string).toLowerCase() >
      (b[sortBy as keyof Book] as string).toLowerCase()
        ? 1
        : -1
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        All Products
      </h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Select
            placeholder="Select Category"
            style={{ width: "100%" }}
            onChange={(value) => setCategory(value)}
            allowClear
          >
            <Option value="Fiction">Fiction</Option>
            <Option value="Science">Science</Option>
            <Option value="SelfDevelopment">Self Development</Option>
            <Option value="Poetry">Poetry</Option>
            <Option value="Religious">Religious</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Slider
            range
            min={0}
            max={100}
            value={priceRange}
            onChange={(value) => setPriceRange(value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Select
            placeholder="Availability"
            style={{ width: "100%" }}
            onChange={(value) => setAvailability(value)}
            allowClear
          >
            <Option value="InStock">In Stock</Option>
            <Option value="OutStock">Stock Out</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {products.map((product: Book) => (
          <Col key={product?._id} xs={24} sm={12} md={6} lg={6} xl={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={currentPage}
        pageSize={pageSize}
        total={productsData?.total || 0}
        onChange={(page, pageSize) => {
          setCurrentPage(page);
          setPageSize(pageSize);
        }}
      />
    </div>
  );
};

export default AllProductsPage;
