import api from "./api";
import { API_ENDPOINTS } from "@/config/apiConfig";

export const jobService = {
  // Employer - Post a new job
  postJob: async (jobData) => {
    const { data } = await api.post(API_ENDPOINTS.JOBS.POST_JOB, jobData);
    return data;
  },

  // Get all jobs
  getAllJobs: async () => {
    const { data } = await api.get(API_ENDPOINTS.JOBS.GET_ALL_JOBS);
    return data;
  },

  // Employer - Get their own jobs
  getMyJobs: async () => {
    const { data } = await api.get(API_ENDPOINTS.JOBS.GET_MY_JOBS);
    return data;
  },

  // Get single job by ID
  getJobById: async (id) => {
    const { data } = await api.get(API_ENDPOINTS.JOBS.GET_JOB_BY_ID(id));
    return data;
  },

  // Employer - Update job
  updateJob: async (jobId, updatedJob) => {
    const { data } = await api.put(
      API_ENDPOINTS.JOBS.UPDATE_JOB(jobId),
      updatedJob
    );
    return data;
  },

  // Employer - Delete job
  deleteJob: async (jobId) => {
    const { data } = await api.delete(API_ENDPOINTS.JOBS.DELETE_JOB(jobId));
    return data;
  },
};

export default jobService;
