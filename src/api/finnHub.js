import axios from "axios";
import APIKEY from "../config";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: APIKEY,
  },
});
