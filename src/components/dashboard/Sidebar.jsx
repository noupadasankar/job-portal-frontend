import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  User,
  BarChart3,
  MessageSquare,
  Settings,
  PlusCircle,
  Briefcase,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUIStore();
  const { user } = useAuthStore();

  const isJobSeeker = user?.role === 'Job Seeker';

  const jobSeekerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: Search, label: 'Find Jobs', path: '/jobs', badge: null },
    { icon: FileText, label: 'My Applications', path: '/applications', badge: 3 },
    { icon: Bookmark, label: 'Saved Jobs', path: '/saved-jobs', badge: null },
    { icon: User, label: 'Profile', path: '/profile', badge: null },
    { icon: BarChart3, label: 'Career Insights',  path: "/jobseeker/analytics", badge: null },
    { icon: MessageSquare, label: 'Messages', path: '/messages', badge: 2 },
    { icon: Settings, label: 'Settings', path: '/settings', badge: null },



  ];

  const employerMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: PlusCircle, label: 'Post Job', path: '/post-job', badge: null },
    { icon: Briefcase, label: 'My Jobs', path: '/my-jobs', badge: null },
    { icon: Users, label: 'Applications', path: '/applications', badge: 12 },
    { icon: Building2, label: 'Company Profile', path: '/company-profile', badge: null },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', badge: null },
    { icon: Bookmark, label: 'Talent Pool', path: '/talent-pool', badge: null },
    { icon: MessageSquare, label: 'Messages', path: '/messages', badge: 5 },
    { icon: Settings, label: 'Settings', path: '/settings', badge: null },
  ];

  const menuItems = isJobSeeker ? jobSeekerMenuItems : employerMenuItems;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: sidebarCollapsed ? '80px' : '280px',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-slate-800">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CareerConnect
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="logo-small"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto"
            >
              <span className="text-white font-bold text-lg">C</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative group',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {item.badge && !sidebarCollapsed && (
                  <Badge variant="destructive" className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebarCollapsed}
          className="w-full"
        >
          {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
