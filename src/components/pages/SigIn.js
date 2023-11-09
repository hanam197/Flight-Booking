// Trong component LoginPage:
import React from "react";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const LoginPage = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:2020/authentication/login",
        values
      );
      const { accessToken, refreshToken, userId } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", userId);

      console.log("Đăng nhập thành công!");
      message.success("Đăng nhập thành công!");
      // Chuyển hướng người dùng đến trang chính
      history.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      // Xử lý các bước sau khi đăng nhập thất bại, ví dụ: hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <Title level={1} style={{ textAlign: "center" }}>
          Đăng Nhập
        </Title>
        <Form
          name="login_form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ email!" },
              { type: "email", message: "Địa chỉ email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Đăng Nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
