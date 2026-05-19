import api from "./api";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const messageService = {
  getConversations: async () => {
    const { data } = await api.get(API_ENDPOINTS.MESSAGES.GET_CONVERSATIONS);
    return data;
  },

  getMessages: async (userId) => {
    const { data } = await api.get(API_ENDPOINTS.MESSAGES.GET_MESSAGES(userId));
    return data;
  },

  sendMessage: async ({ receiverId, content }) => {
    const { data } = await api.post(API_ENDPOINTS.MESSAGES.SEND_MESSAGE, {
      receiverId,
      content,
    });

    return data;
  },
};