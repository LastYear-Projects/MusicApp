import React, { useState } from "react";
import TransitionsModal from "../modal/modal";
import { Box, Button } from "@mui/material";

import { Form, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AlbumIcon from "@mui/icons-material/Album";
import ListAltIcon from "@mui/icons-material/ListAlt";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";

const enumFields = [
  { field: "title", placeholder: "Song Title", Icon: <UserOutlined /> },
  { field: "album", placeholder: "Album Name", Icon: <UserOutlined /> },
  { field: "artist", placeholder: "Song Artist", Icon: <UserOutlined /> },
  { field: "year", placeholder: "Release Date", Icon: <CalendarMonthIcon /> },
  {
    field: "duration",
    placeholder: "Song Duration",
    Icon: <AvTimerIcon />,
  },
  { field: "price", placeholder: "Song Price", Icon: <AttachMoneyIcon /> },
  {
    field: "album_image",
    placeholder: "Album Image Url",
    Icon: <AlbumIcon />,
  },
  { field: "preview_url", placeholder: "Preview Url", Icon: <PlayArrowIcon /> },
  {
    field: "youtube_id",
    placeholder: "Song Id From Youtube",
    Icon: <YouTubeIcon />,
  },
  { field: "genre", placeholder: "Song Genre", Icon: <ListAltIcon /> },
];

const AddSong = ({ openModal, setOpenModal }) => {
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({
    title: "",
    album: "",
    artist: "",
    year: "",
    duration: "",
    price: "",
    album_image: "",
    preview_url: "",
    youtube_id: "",
    genre: "",
  });

  const onSubmit = async () => {
    const requiredFields = [
      "title",
      "album",
      "artist",
      "year",
      "duration",
      "price",
      "album_image",
      "preview_url",
      "youtube_id",
      "genre",
    ];
    const hasEmptyField = requiredFields.some((field) => !formData[field]);

    if (hasEmptyField) {
      message.error("Please fill in all required fields");
      return;
    }

    if (isNaN(formData.duration)) {
      message.error("Duration must be a number");
      return;
    }

    const decimalNumberRegex = /^\d+(\.\d+)?$/;
    if (!decimalNumberRegex.test(formData.price)) {
      message.error("Price must be a number");
      return;
    }

    const yearRegex = /^[0-9\/\.\-]+$/;
    if (!yearRegex.test(formData.year)) {
      message.error(
        "Year must be a number with that format: 00/00/0000 or 00.00.0000"
      );
      return;
    }

    const lettersRegex = /^[a-zA-Z]+$/;
    if (!lettersRegex.test(formData.genre)) {
      message.error("Genre must contain only letters and commas");
      return;
    }

    // const youtubeVideoIdRegex = /^[a-zA-Z0-9_-]{11}$/;
    // if (!youtubeVideoIdRegex.test(formData.youtube_id)) {
    //   message.error("Youtube Id must be 11 characters long");
    //   return;
    // }

    // await axios.post("http://localhost:6969/songs", formData);
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
                  {
                    required: field === "preview_url" ? false : true,
                    message: `Please input ${placeholder}`,
                  },
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
