import React, { useState } from "react";
import TransitionsModal from "../modal/modal";
import { Box, Button } from "@mui/material";

import { Form, Input, DatePicker, Upload, message } from "antd";
import { UserOutlined, InboxOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

const AddSong = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    dateOfBirth: null,
    profilePicture: "",
    password: "",
    cPassword: "",
  });

  const onSubmit = async () => {
    const requiredFields = [
      "email",
      "fullName",
      "dateOfBirth",
      "password",
      "cPassword",
    ];
    const hasEmptyField = requiredFields.some((field) => !formData[field]);

    if (hasEmptyField) {
      message.error("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.cPassword) {
      message.error("Passwords do not match");
      return;
    } else {
      setOpenModal(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box>
      <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
      <TransitionsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title="add Song"
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              {...register("email")}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Full Name"
              {...register("fullName")}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="profilePicture"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: false,
                message: "Please upload your profile picture!",
              },
            ]}
          ></Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password
              prefix={<UserOutlined />}
              placeholder="Password"
              {...register("password")}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="cPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<UserOutlined />}
              placeholder="Confirm Password"
              {...register("cPassword")}
              onChange={(e) => handleInputChange("cPassword", e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              variant="contained"
              style={{
                width: "100%",
                backgroundColor: "#7A7A7A",
                marginTop: "1rem",
              }}
              onClick={onSubmit}
            >
              Add Song
            </Button>
          </Form.Item>
        </Form>
      </TransitionsModal>
    </Box>
  );
};

export default AddSong;
