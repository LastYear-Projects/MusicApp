import { Grid } from "@mui/material";
import React from "react";
import DefaultCard from "../songCard/songCard";

const List = ({
  list,
  func = () => {},
  testFunc = () => {},
  creator = "",
  CardComponent = DefaultCard,
  flexDirection = "rows",
}) => {
  return (
    <Grid container flexDirection={flexDirection} justifyContent="center">
      {list &&
        list.map((item) => {
          return (
            <Grid
              style={{
                padding: flexDirection === "rows" ? "1rem" : "0",
                justifyContent: "center",
                display: "flex",
              }}
              key={item}
            >
              <CardComponent
                {...item}
                func={func}
                editFunc={testFunc}
                // creator={creator}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default List;
