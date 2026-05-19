import api from "./api";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const savedJobService = {
  saveJob: async (jobId) => {
    const { data } = await api.post(API_ENDPOINTS.SAVED_JOBS.SAVE_JOB, { jobId });
    return data;
  },

  getSavedJobs: async () => {
    const { data } = await api.get(API_ENDPOINTS.SAVED_JOBS.GET_SAVED_JOBS);
    return data;
  },

  unsaveJob: async (jobId) => {
    const { data } = await api.delete(API_ENDPOINTS.SAVED_JOBS.UNSAVE_JOB(jobId));
    return data;
  },

  checkSavedJob: async (jobId) => {
    const { data } = await api.get(API_ENDPOINTS.SAVED_JOBS.CHECK_SAVED_JOB(jobId));
    return data;
  },
};