import React from "react";
import { Row, Col, Card, Typography, Form, Input, Select, Button } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

function AboutSection() {
  const onFinish = (values) => {
    console.log("Received values:", values);
    // Gửi dữ liệu form đi xử lý ở đây
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={1} style={{ textAlign: "center" }}>
        CÔNG TY TNHH VÉ MÁY BAY ABAY
      </Title>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Thông Tin Liên Hệ Hổ Trợ">
            <Form
              name="contact_form"
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
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
                label="Vấn đề liên hệ"
                name="contactIssue"
                rules={[
                  { required: true, message: "Vui lòng chọn vấn đề liên hệ!" },
                ]}
              >
                <Select defaultValue="other">
                  <Option value="other" selected>
                    Vấn đề khác
                  </Option>
                  <Option value="datve">Yêu Đặt Vé</Option>
                  <Option value="gopy">Góp Ý Website</Option>
                  <Option value="thongtindatve">
                    Hổ Trợ Thông Tin Sau Đặt Vé
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Nội dung liên hệ"
                name="contactContent"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung liên hệ!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="VĂN PHÒNG TẠI HÀ NỘI">
            <Text>123 Phố Tân Mai, Quận Hoàng Mai</Text>
            <br />
            <Text>1234.123.123</Text>
            <br />
            <Text>contact@abay.vn</Text>
            <br />
            <a href="http://localhost:3000/">www.abay.com</a>
            <br />
            <Text>Liên Hệ Với Văn Phòng Tổng Đài Chính: 0123456789</Text>
          </Card>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="VĂN PHÒNG TẠI TP HỒ CHÍ MINH">
            <Text>123 Trần Hưng Đạo, Phường 1, Quận 1</Text>
            <br />
            <Text>1234.123.123</Text>
            <br />
            <Text>contact@abay.vn</Text>
            <br />
            <a href="http://localhost:3000/">www.abay.com</a>
            <br />
            <Text>Liên Hệ Với Văn Phòng Tổng Đài Chính: 0123456789</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AboutSection;
