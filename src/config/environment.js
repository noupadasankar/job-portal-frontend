/**
 * Environment Configuration
 * Provides environment-specific settings and utility functions
 */

const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

export const ENV = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1',
  
  // Cloudinary Configuration
  CLOUDINARY: {
    CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
    API_KEY: import.meta.env.VITE_CLOUDINARY_API_KEY || '',
  },

  // Environment Flags
  IS_DEVELOPMENT: isDevelopment,
  IS_PRODUCTION: isProduction,

  // Feature Flags (can be toggled based on environment)
  FEATURES: {
    ENABLE_ANALYTICS: true,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_MESSAGING: true,
  },

  // Logging
  ENABLE_LOGGING: isDevelopment,
};

/**
 * Logger - Logs messages only in development
 */
export const logger = {
  log: (message, data) => {
    if (ENV.ENABLE_LOGGING) {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error || '');
  },
  warn: (message, data) => {
    if (ENV.ENABLE_LOGGING) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },
};

export default ENV;
