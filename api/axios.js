import axios from "axios";
export default axios.create({
  baseURL: process.env.BASE_URL || "https://boiling-spire-58072.herokuapp.com"
});
