import api from "./api";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const applicationService = {
  getMyApplications: async () => {
    const { data } = await api.get(API_ENDPOINTS.APPLICATIONS.GET_JOBSEEKER_APPLICATIONS);
    return data;
  },

  deleteApplication: async (id) => {
    const { data } = await api.delete(API_ENDPOINTS.APPLICATIONS.DELETE_APPLICATION(id));
    return data;
  },

  getSingleApplication: async (id) => {
    const { data } = await api.get(API_ENDPOINTS.APPLICATIONS.GET_SINGLE_APPLICATION(id));
    return data;
  },
};