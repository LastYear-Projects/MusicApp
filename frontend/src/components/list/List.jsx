import { Grid } from "@mui/material";
import React from "react";
import DefaultCard from "../songCard/songCard";

const List = ({ list, CardComponent = DefaultCard }) => {
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
