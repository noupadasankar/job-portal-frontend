import axios from "axios";
import { ENV } from "@/config/environment";

const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});

export default api;