const axios = require("axios");

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios({
  url: "/user/login",
  method: "POST",
  data: {
    username: "mhqb365",
    password: "QBao2020#!",
  },
})
  .then((response) => {
    console.log(response.headers['set-cookie'])
    console.log(response.data)
  })
  .catch((error) => console.error(error.response));
