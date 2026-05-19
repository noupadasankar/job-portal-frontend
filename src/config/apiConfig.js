/**
 * API Configuration - Centralized endpoint management
 * All API endpoints are defined here for consistency and easy maintenance
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export const API_ENDPOINTS = {
  // ============================================
  // AUTH ENDPOINTS
  // ============================================
  AUTH: {
    LOGIN: `${API_BASE_URL}/user/login`,
    REGISTER: `${API_BASE_URL}/user/register`,
    LOGOUT: `${API_BASE_URL}/user/logout`,
  },

  // ============================================
  // USER ENDPOINTS
  // ============================================
  USER: {
    GET_PROFILE: `${API_BASE_URL}/user/getuser`,
    UPDATE_PROFILE: `${API_BASE_URL}/user/profile/update`,
    UPLOAD_AVATAR: `${API_BASE_URL}/user/avatar/upload`,
    UPDATE_PASSWORD: `${API_BASE_URL}/user/password/update`,
  },

  // ============================================
  // JOB ENDPOINTS
  // ============================================
  JOBS: {
    POST_JOB: `${API_BASE_URL}/job/post`,
    GET_ALL_JOBS: `${API_BASE_URL}/job/getall`,
    GET_MY_JOBS: `${API_BASE_URL}/job/getmyjobs`,
    GET_JOB_BY_ID: (id) => `${API_BASE_URL}/job/${id}`,
    UPDATE_JOB: (id) => `${API_BASE_URL}/job/update/${id}`,
    DELETE_JOB: (id) => `${API_BASE_URL}/job/delete/${id}`,
  },

  // ============================================
  // APPLICATION ENDPOINTS
  // ============================================
  APPLICATIONS: {
    POST_APPLICATION: `${API_BASE_URL}/application/post`,
    GET_JOBSEEKER_APPLICATIONS: `${API_BASE_URL}/application/jobseeker/getall`,
    GET_JOBSEEKER_APPLICATIONS_ALT: `${API_BASE_URL}/application/jobseeker`,
    GET_EMPLOYER_APPLICATIONS: `${API_BASE_URL}/application/employer/getall`,
    DELETE_APPLICATION: (id) => `${API_BASE_URL}/application/delete/${id}`,
    GET_SINGLE_APPLICATION: (id) => `${API_BASE_URL}/application/${id}`,
  },

  // ============================================
  // SAVED JOBS ENDPOINTS
  // ============================================
  SAVED_JOBS: {
    SAVE_JOB: `${API_BASE_URL}/user/saved-jobs/save`,
    GET_SAVED_JOBS: `${API_BASE_URL}/user/saved-jobs/all`,
    UNSAVE_JOB: (id) => `${API_BASE_URL}/user/saved-jobs/${id}`,
    CHECK_SAVED_JOB: (id) => `${API_BASE_URL}/user/saved-jobs/check/${id}`,
  },

  // ============================================
  // MESSAGE ENDPOINTS
  // ============================================
  MESSAGES: {
    GET_CONVERSATIONS: `${API_BASE_URL}/message/conversations`,
    GET_MESSAGES: (userId) => `${API_BASE_URL}/message/${userId}`,
    SEND_MESSAGE: `${API_BASE_URL}/message/send`,
  },

  // ============================================
  // ANALYTICS ENDPOINTS
  // ============================================
  ANALYTICS: {
    GET_JOBSEEKER_ANALYTICS: `${API_BASE_URL}/analytics/jobseeker`,
  },
};

export default API_ENDPOINTS;
