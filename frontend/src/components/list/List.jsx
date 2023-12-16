import { Grid } from "@mui/material";
import React from "react";
import DefaultCard from "../songCard/songCard";

const List = ({
  list,
  CardComponent = DefaultCard,
  flexDirection = "rows",
}) => {
  return (
    <Grid container flexDirection={flexDirection} justifyContent="center">
      {list.map((item) => {
        return (
          <Grid
            style={{
              padding: flexDirection === "rows" ? "1rem" : "0",
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
