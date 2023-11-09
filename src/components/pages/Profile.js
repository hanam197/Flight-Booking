import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Grid,
  message,
  Input,
  Row,
  Upload,
  Modal,
  Form,
} from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
  const screens = useBreakpoint();
  const [userData, setUserData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    fullName: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`http://localhost:2020/user/profile/${userId}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const handleAvatarChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  };
  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match");
      }

      const userId = localStorage.getItem("userId");
      const response = await axios.patch(
        `http://localhost:2020/user/change-password/${userId}`,
        {
          oldPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        message.success("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        throw new Error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      message.error(error.message || "Failed to change password");
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    try {
      const file = fileList[0].originFileObj;

      const cloud_name = "dawjdmjtm";
      const api_key = "723878353467946";
      const api_secret = "70QO6G6-EEGm8NItN4wO10RMz0M";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      );
      console.log(response);
      if (response.status === 200) {
        const data = response.data;

        message.success("Avatar updated successfully");

        const userId = localStorage.getItem("userId");

        await axios.patch(`http://localhost:2020/user/avatar/${userId}`, {
          avatarUrl: data.secure_url,
        });

        setUserData((prevUserData) => ({
          ...prevUserData,
          avatar: data.secure_url,
        }));
      } else {
        throw new Error("Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      message.error("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };
  const handleEditInfo = () => {
    setNewUserInfo({
      email: userData.email,
      fullName: userData.fullName,
      phoneNumber: userData.phoneNumber,
    });
    setIsModalVisible(true);
  };

  const handleSaveInfo = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.patch(
        `http://localhost:2020/user/update-profile/${userId}`,
        newUserInfo
      );

      if (response.status === 200) {
        message.success("Profile updated successfully");
        setUserData({ ...userData, ...newUserInfo });
        setIsModalVisible(false);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(error.message || "Failed to update profile");
    }
  };
  return (
    <div style={{ padding: 20, height: "100vh" }}>
      <Row gutter={[16, 16]}>
        <Col span={screens.md ? 12 : 24}>
          <Card style={{ width: "100%" }}>
            <div className="text-center">
              <h1>Change password</h1>
            </div>
            <div style={{ marginTop: 20 }}>
              <Input.Password
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Input.Password
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Input.Password
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <Button type="primary" onClick={handleChangePassword}>
                Change Password
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={screens.md ? 12 : 24}>
          <Card style={{ width: "100%" }}>
            <div className="text-center">
              <h1>Profile</h1>
            </div>
            {userData && (
              <>
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="text-center mb-2">
                      <h3>Avatar</h3>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src={userData.avatar}
                        size={120}
                        style={{ marginBottom: 16 }}
                      />
                      <Meta
                        title={userData.fullName}
                        description={userData.email}
                        style={{ textAlign: "center" }}
                      />
                      <div className="d-flex mt-3">
                        <Upload
                          onChange={handleAvatarChange}
                          fileList={fileList}
                          beforeUpload={() => false}
                          className="m-2"
                          showUploadList={{
                            showRemoveIcon: false,
                            showDownloadIcon: false,
                            showPreviewIcon: false,
                            showFileName: false, // Ẩn tên file
                          }}
                        >
                          <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>

                        <Button
                          type="primary"
                          onClick={handleUpload}
                          loading={loading}
                          className="m-2"
                        >
                          Upload
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="d-flex justify-content-center">
                      <div className="text-center mb-5">
                        <h3>Infomation</h3>
                      </div>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<EditOutlined />}
                        style={{ marginLeft: 10 }}
                        onClick={handleEditInfo}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <p>
                        <strong>Email:</strong> {userData.email}
                      </p>
                      <p>
                        <strong>Full Name:</strong> {userData.fullName}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {userData.phoneNumber}
                      </p>
                      <p>
                        <strong>Date Created:</strong>{" "}
                        {new Date(userData.dateCreated).toLocaleDateString()}
                      </p>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        title="Edit Information"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSaveInfo}
      >
        <Form.Item label="Full Name">
          <Input
            placeholder="Full Name"
            value={newUserInfo.fullName}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, fullName: e.target.value })
            }
            style={{ marginBottom: 10 }}
          />
        </Form.Item>
        <Form.Item label="Phone Number">
          <Input
            placeholder="Phone Number"
            value={newUserInfo.phoneNumber}
            onChange={(e) =>
              setNewUserInfo({ ...newUserInfo, phoneNumber: e.target.value })
            }
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default ProfilePage;
