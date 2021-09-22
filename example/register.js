const axios = require("axios");

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios({
  url: "/user/register",
  method: "POST",
  data: {
    username: "mhqb365",
    password: "QBao2020#!",
    email: "mhqb365@gmail.com",
  },
})
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error.response));
