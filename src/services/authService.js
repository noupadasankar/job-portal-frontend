import axios from "axios";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const authService = {
  login: async (credentials) => {
    const { data } = await axios.post(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return data;
  },

  register: async (formData) => {
    const { data } = await axios.post(
      API_ENDPOINTS.AUTH.REGISTER,
      formData,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return data;
  },

  logout: async () => {
    const { data } = await axios.get(
      API_ENDPOINTS.AUTH.LOGOUT,
      {
        withCredentials: true,
      }
    );
    return data;
  },
};

export default authService;
