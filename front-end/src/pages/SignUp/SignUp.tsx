import { Button, Card, Typography } from "antd";
import "antd/dist/reset.css"; // Ensure this is imported for styling
import BookForm from "../../component/form/BookForm";
import BookInput from "../../component/form/BookInput";
import { FieldValues } from "react-hook-form";

const { Title } = Typography;

const SignUp = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Title level={2} style={{ marginBottom: 10 }}>
        Create Account
      </Title>
      <p style={{ marginBottom: 30, color: "#6c757d" }}>
        Home / Create Account
      </p>

      <Card
        style={{
          width: 500,
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BookForm onSubmit={onSubmit}>
          <BookInput type="text" name="name" label="Name:" />
          <BookInput type="text" name="email" label="Email:" />
          <BookInput type="text" name="password" label="Password" />
          <Button htmlType="submit">Login</Button>
        </BookForm>
      </Card>
    </div>
  );
};

export default SignUp;
