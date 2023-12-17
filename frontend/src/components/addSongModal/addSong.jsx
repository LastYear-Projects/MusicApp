import React, { useState } from "react";
import TransitionsModal from "../modal/modal";
import { Box, Button } from "@mui/material";

import { Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

const enumFields = [
  "SongTitle",
  "AlbumName",
  "Songartist",
  "Year",
  "SongDuration",
  "SongPrice",
  "AlbumImageUrl",
  "PreviewUrl",
  "SongIdFromYoutube",
  "NumberOfPurchases",
  "SongGenre",
];

const AddSong = () => {
  const { register, handleSubmit } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    SongTitle: "",
    AlbumName: "",
    Songartist: "",
    Year: "",
    SongDuration: "",
    SongPrice: "",
    AlbumImageUrl: "",
    PreviewUrl: "",
    SongIdFromYoutube: "",
    NumberOfPurchases: "",
    SongGenre: "",
  });

  const onSubmit = async () => {
    const requiredFields = [
      "SongTitle",
      "AlbumName",
      "Songartist",
      "Year",
      "SongDuration",
      "SongPrice",
      "AlbumImageUrl",
      "PreviewUrl",
      "SongIdFromYoutube",
      "NumberOfPurchases",
      "SongGenre",
    ];
    const hasEmptyField = requiredFields.some((field) => !formData[field]);

    if (hasEmptyField) {
      message.error("Please fill in all required fields");
      return;
    }
    setOpenModal(false);
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
        title="Add Song"
      >
        <Form onFinish={handleSubmit(onSubmit)}>
          {enumFields.map((field) => {
            return (
              <Form.Item
                key={field}
                name={field}
                rules={[{ required: true, message: `Please input ${field}` }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder={field}
                  {...register(field)}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              </Form.Item>
            );
          })}

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
