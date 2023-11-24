import React, { useEffect, useState } from "react";
import { Row, Col, Card, Typography, Form, Input, Select, Button } from "antd";
import queryString from "query-string";

const { Title, Text } = Typography;
const { Option } = Select;

function PaymentSuccess() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  // Handle submission of form
  useEffect(() => {
    const sendPostRequest = async (formData) => {
      try {
        const response = await fetch("http://127.0.0.1:2020/transaction", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Transaction data sent successfully.");
        } else {
          console.error("Failed to send transaction data.");
        }
      } catch (error) {
        console.error("Error sending transaction data:", error);
      }
    };

    const params = queryString.parse(window.location.search);

    // Extract parameters
    const {
      vnp_TransactionNo,
      vnp_Amount,
      vnp_BankCode,
      vnp_PayDate,
      vnp_OrderInfo,
      vnp_TransactionStatus,
    } = params;
    setPaymentStatus(vnp_TransactionStatus);
    console.log(vnp_TransactionStatus);
    // Form data to be sent
    const formData = {
      vnp_TransactionNo,
      vnp_Amount,
      vnp_BankCode,
      vnp_PayDate,
      vnp_OrderInfo,
      vnp_TransactionStatus,
    };

    // Send POST request
    sendPostRequest(formData);
  }, []);

  return (
    <div style={{ padding: "20px", height: "100vh" }}>
      <div className="text-center pt-5">
        <h1>
          {paymentStatus == "00"
            ? "Thanh Toán Thành Công"
            : "Thanh Toán Thất Bại"}
        </h1>
      </div>
    </div>
  );
}

export default PaymentSuccess;
