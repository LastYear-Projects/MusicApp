import React from "react";
import Chat from "../../components/chat/Chat";
import { Box, Button } from "@mui/material";

const CartPage = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Box>
      <Button onClick={() => setIsOpen(true)}>Open Chat</Button>
      <Chat isOpen={isOpen} handleOpen={handleOpen} />
    </Box>
  );
};

export default CartPage;
