import { Box } from "@mui/material";
import React from "react";
import useFetch from "../../hooks/useFetch.tsx";
import List from "../../components/list/List.tsx";
import Loader from "../../components/loader/loader.tsx";
const HomePage = () => {
  const {
    data: songs,
    error,
    isLoading,
  } = useFetch("http://localhost:6969/songs");
  //TODO : send the data to context/redux, and handle error.
  return (
    <Box marginBottom="3.3rem">
      <Loader isLoading={isLoading}>
        <List list={songs} />
      </Loader>
    </Box>
  );
};

export default HomePage;
