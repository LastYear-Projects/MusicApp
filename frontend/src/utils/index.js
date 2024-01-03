import axios from "axios";

const handleRequestWithToken = async () => {
  const token = JSON.parse(localStorage.getItem("moozikaToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  if (!token || !refreshToken) return false;
  axios
    .post("http://localhost:6969/auth/check-token", {
      token: token,
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      axios
        .post("http://localhost:6969/auth/refresh-token", {
          refreshToken: refreshToken,
        })
        .then((res) => {
          localStorage.setItem("moozikaToken", JSON.stringify(res.data.token));
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(res.data.refreshToken)
          );
          return true;
        })
        .catch(() => {
          axios.post("http://localhost:6969/auth/logout", {
            refreshToken: refreshToken,
          });
          localStorage.removeItem("moozikaToken");
          localStorage.removeItem("refreshToken");
          // navigate to the homePage
          return false;
        });
    });
};

export { handleRequestWithToken };
