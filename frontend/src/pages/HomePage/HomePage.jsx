import React from "react";
import List from "../../components/list/List";
import Comment from "../../components/comment/Comment";

const HomePage = () => {
  const test = [
    {
      profile_image: "https://picsum.photos/200",
      username: "username",
      comment: "ttett",
      date: "25.10.2023",
    },
    {
      profile_image: "https://picsum.photos/200",
      username: "usernfdsfdsfdsame",
      comment:
        "esttesttesttestesttesttesttesttesttesdfdsfsttesttsttestttesttesdfdsfsttesttsttestt",
      date: "25.10.2023",
    },
    {
      profile_image: "https://picsum.photos/200",
      username: "fdsfdsfds",
      comment:
        "esttesttesttestesttesttesttesttesttesttesttsttestttesttesttesttsttestt",
      date: "25.10.2023",
    },
  ];
  return (
    <List list={test} CardComponent={Comment} flexDirection="column-reverse" />
  );
};

export default HomePage;
