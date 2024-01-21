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
      const response = await axios.post(
        "http://localhost:6969/users/user-details",
        { token: localStorage.getItem("moozikaToken") }
      ).then((res) => {
        setUserDetails(res.data);
      })
    }
    fetchUser();
  }, []);

  return (
    userDetails && 
    (
      <Box>
      <div style={{height: "100vh", overflowY: "hidden", marginBottom: "3.5rem"}}>
      <PrettyChatWindow
        projectId="2fb16285-f632-4fa3-9954-d25203f389f2"
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
