import React, { useState } from "react";
import TransitionsModal from "../modal/modal";
import { Box, Button } from "@mui/material";

import { Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AlbumIcon from "@mui/icons-material/Album";
import ListAltIcon from "@mui/icons-material/ListAlt";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const enumFields = [
  { field: "SongTitle", placeholder: "Song Title", Icon: <UserOutlined /> },
  { field: "AlbumName", placeholder: "Album Name", Icon: <UserOutlined /> },
  { field: "Songartist", placeholder: "Song Artist", Icon: <UserOutlined /> },
  { field: "Year", placeholder: "Year", Icon: <CalendarMonthIcon /> },
  {
    field: "SongDuration",
    placeholder: "Song Duration",
    Icon: <AvTimerIcon />,
  },
  { field: "SongPrice", placeholder: "Song Price", Icon: <AttachMoneyIcon /> },
  {
    field: "AlbumImageUrl",
    placeholder: "Album Image Url",
    Icon: <AlbumIcon />,
  },
  { field: "PreviewUrl", placeholder: "Preview Url", Icon: <PlayArrowIcon /> },
  {
    field: "SongIdFromYoutube",
    placeholder: "Song Id From Youtube",
    Icon: <YouTubeIcon />,
  },
  {
    field: "NumberOfPurchases",
    placeholder: "Number Of Purchases",
    Icon: <ShoppingBagIcon />,
  },
  { field: "SongGenre", placeholder: "Song Genre", Icon: <ListAltIcon /> },
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
          {enumFields.map(({ field, placeholder, Icon }) => {
            return (
              <Form.Item
                key={field}
                name={field}
                rules={[
                  { required: true, message: `Please input ${placeholder}` },
                ]}
              >
                <Input
                  prefix={Icon}
                  placeholder={placeholder}
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
