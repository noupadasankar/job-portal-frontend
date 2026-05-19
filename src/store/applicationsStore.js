import { create } from 'zustand';

export const useApplicationsStore = create((set) => ({
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,

  setApplications: (applications) => set({ applications }),
  
  setCurrentApplication: (application) => set({ currentApplication: application }),
  
  addApplication: (application) => set((state) => ({
    applications: [application, ...state.applications],
  })),
  
  updateApplication: (applicationId, updates) => set((state) => ({
    applications: state.applications.map((app) =>
      app._id === applicationId ? { ...app, ...updates } : app
    ),
  })),
  
  deleteApplication: (applicationId) => set((state) => ({
    applications: state.applications.filter((app) => app._id !== applicationId),
  })),
  
  // For Kanban board
  moveApplication: (applicationId, newStatus) => set((state) => ({
    applications: state.applications.map((app) =>
      app._id === applicationId ? { ...app, status: newStatus } : app
    ),
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
}));
