import api from "./api";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const userService = {
  getUser: async () => {
    const { data } = await api.get(API_ENDPOINTS.USER.GET_PROFILE);
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, payload);
    return data;
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const { data } = await api.put(API_ENDPOINTS.USER.UPLOAD_AVATAR, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  },

  updatePassword: async (payload) => {
    const { data } = await api.put(API_ENDPOINTS.USER.UPDATE_PASSWORD, payload);
    return data;
  },
};