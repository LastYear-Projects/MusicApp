import { message } from "antd";
import axios from "axios";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  const fetchUser = async () => {
    if (!localStorage.getItem("moozikaToken")) {
      message.error("You must be logged in before accessing this page");
      return setIsLoggedIn(false);
    }

    try {
      const response = await axios.post(
        "http://localhost:6969/users/user-details",
        { token: localStorage.getItem("moozikaToken") }
      );
      if (response.status !== 200) {
        message.error("You must be logged in before accessing this page");
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
    } catch (error) {
      message.error("You must be logged in before accessing this page");
      setIsLoggedIn(false);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
