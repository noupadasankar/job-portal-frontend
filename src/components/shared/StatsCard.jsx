import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  color = 'primary',
  delay = 0 
}) => {
  const colorVariants = {
    primary: 'from-primary/10 to-primary/5 text-primary border-primary/20',
    accent: 'from-accent/10 to-accent/5 text-accent border-accent/20',
    success: 'from-green-500/10 to-green-500/5 text-green-600 border-green-500/20',
    warning: 'from-yellow-500/10 to-yellow-500/5 text-yellow-600 border-yellow-500/20',
    destructive: 'from-red-500/10 to-red-500/5 text-red-600 border-red-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="glass-hover overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </p>
              <motion.h3 
                className="text-3xl font-bold mt-2"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
              >
                {value}
              </motion.h3>
              
              {trend && (
                <div className="flex items-center gap-1 mt-2">
                  {trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    trend === 'up' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {trendValue}%
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              )}
            </div>

            <motion.div
              className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br border',
                colorVariants[color]
              )}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon className="w-7 h-7" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
