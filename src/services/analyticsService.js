import api from "./api";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const analyticsService = {
  getJobSeekerAnalytics: async () => {
    const { data } = await api.get(API_ENDPOINTS.ANALYTICS.GET_JOBSEEKER_ANALYTICS);
    return data;
  },
};