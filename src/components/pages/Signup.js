import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import axios from "axios";

const { Title } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:2020/authentication/register",
        values
      );
      setLoading(false);
      message.success("Đăng ký thành công!");
      console.log("Đăng ký thành công:", response.data);
      // Xử lý các bước sau khi đăng ký thành công, ví dụ: chuyển hướng người dùng đến trang chính
    } catch (error) {
      setLoading(false);
      console.error("Đăng ký thất bại:", error.response.data);
      message.error(error.response.data.error || "Đăng ký thất bại!");
      // Xử lý các bước sau khi đăng ký thất bại, ví dụ: hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={20} sm={16} md={12} lg={8}>
        <Title level={1} style={{ textAlign: "center" }}>
          Đăng Ký
        </Title>
        <Form
          name="register_form"
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
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng Ký
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
