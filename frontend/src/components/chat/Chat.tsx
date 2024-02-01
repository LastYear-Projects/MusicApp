import { useEffect, useState } from "react";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "axios";
import { UserType } from "../../types";
import { Box } from "@mui/material";

const Chat = () => {
  const [userDetails, setUserDetails] = useState<UserType>();
  const token = localStorage.getItem("moozikaToken");
  if (!token) return null;

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios
        .post("http://localhost:6969/users/user-details", {
          token: localStorage.getItem("moozikaToken"),
        })
        .then((res) => {
          setUserDetails(res.data);
        });
    };
    fetchUser();
  }, []);

  return (
    userDetails && (
      <Box>
        <div
          style={{
            height: "100vh",
            overflowY: "hidden",
            marginBottom: "3.5rem",
          }}
        >
          <PrettyChatWindow
            projectId="0065a0fd-6a45-4e13-bb94-ddd7556671aa"
            username={userDetails.email} // adam
            secret={userDetails.email} // pass1234
            style={{ height: "100%" }}
          />
        </div>
      </Box>
    )
  );
};

export default Chat;
