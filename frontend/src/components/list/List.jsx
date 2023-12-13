import { Grid } from "@mui/material";
import React from "react";
import DefaultCard from "../songCard/songCard";

const cardArray = [
  {
    album_image: "https://picsum.photos/200",
    title: "Nana",
    album: "Malibu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nana",
    album: "Malibu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
  {
    album_image: "https://picsum.photos/200",
    title: "Nanadsfds",
    album: "Malihgfhgfbu",
    artist: "Anderson, Paak",
    genre: ["Rap", "Hip-Hop"],
    year: 2016,
    duration: 320000,
    price: "39.49$",
    numOfPurchases: 4,
    numOfComments: 6,
  },
];
const List = ({ list = cardArray, CardComponent = DefaultCard }) => {
  return (
    <Grid container>
      {list.map((item) => {
        return (
          <Grid
            style={{
              padding: "1rem",
              justifyContent: "center",
              display: "flex",
            }}
            key={item}
          >
            <CardComponent {...item} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default List;
