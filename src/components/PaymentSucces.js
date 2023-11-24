import React from "react";
import { Row, Col, Card, Typography, Form, Input, Select, Button } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

function PaymentSuccess() {
  return (
    <div style={{ padding: "20px", height: "100vh" }}>
      <h1 className="text-center pt-5"> Thanh Toán Thành Công</h1>
      <div className="text-center pt-5">
        <img src="https://thumbs.dreamstime.com/b/payment-successful-template-vector-art-success-ful-206586442.jpg"></img>
      </div>
    </div>
  );
}

export default PaymentSuccess;
