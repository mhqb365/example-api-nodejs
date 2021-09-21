const axios = require("axios");

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios({
  url: "/user/register",
  method: "POST",
  data: {
    username: "admin",
    password: "admin",
    email: "admin@gmail.com",
  },
})
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));
