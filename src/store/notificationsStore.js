import { create } from 'zustand';

export const useNotificationsStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        id: Date.now(),
        read: false,
        timestamp: new Date(),
        ...notification,
      },
      ...state.notifications,
    ],
    unreadCount: state.unreadCount + 1,
  })),

  markAsRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map((notif) =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),

  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
    unreadCount: 0,
  })),

  deleteNotification: (notificationId) => set((state) => {
    const notification = state.notifications.find((n) => n.id === notificationId);
    return {
      notifications: state.notifications.filter((n) => n.id !== notificationId),
      unreadCount: notification && !notification.read 
        ? Math.max(0, state.unreadCount - 1) 
        : state.unreadCount,
    };
  }),

  setNotifications: (notifications) => set({
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
  }),
}));
