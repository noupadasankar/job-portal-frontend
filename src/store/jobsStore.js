import { create } from 'zustand';

export const useJobsStore = create((set, get) => ({
  jobs: [],
  currentJob: null,
  filters: {
    search: '',
    location: '',
    jobType: [],
    salaryRange: [0, 200000],
    experience: '',
    postedDate: '',
  },
  loading: false,
  error: null,

  setJobs: (jobs) => set({ jobs }),
  
  setCurrentJob: (job) => set({ currentJob: job }),
  
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  
  updateJob: (jobId, updates) => set((state) => ({
    jobs: state.jobs.map((job) => 
      job._id === jobId ? { ...job, ...updates } : job
    ),
  })),
  
  deleteJob: (jobId) => set((state) => ({
    jobs: state.jobs.filter((job) => job._id !== jobId),
  })),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
  
  resetFilters: () => set({
    filters: {
      search: '',
      location: '',
      jobType: [],
      salaryRange: [0, 200000],
      experience: '',
      postedDate: '',
    },
  }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));
