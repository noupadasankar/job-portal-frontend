import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Bookmark,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, formatRelativeTime, formatSalary, getInitials } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const JobCard = ({ job, index = 0, onSave, isSaved = false }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job/${job.id ?? job._id}`);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave?.(job.id ?? job._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className="glass-hover cursor-pointer overflow-hidden group"
        onClick={handleCardClick}
      >
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <Avatar className="w-12 h-12 border-2 border-white dark:border-slate-800 shadow-md">
              <AvatarImage src={job.companyLogo} alt={job.company} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(job.company)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    {job.company}
                    {job.verified && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="success" className="text-xs px-1.5 py-0">
                              ✓
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Verified Company</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </p>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={handleSave}
                      >
                        <Bookmark
                          className={cn(
                            'w-5 h-5 transition-all',
                            isSaved
                              ? 'fill-primary text-primary'
                              : 'text-gray-400 group-hover:text-primary'
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isSaved ? 'Remove from saved' : 'Save job'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>

            {job.salary && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span>{formatSalary(job.salary.min, job.salary.max)}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{formatRelativeTime(job.postedDate)}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {job.description}
          </p>

          {/* Skills/Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills?.slice(0, 4).map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills?.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{job.skills.length - 4}
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {job.matchScore && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-600">
                          {job.matchScore}% Match
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on your profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{job.views || 0} views</span>
              </div>
            </div>

            <div className="flex gap-2">
              {job.easyApply && (
                <Badge variant="success" className="text-xs">
                  Easy Apply
                </Badge>
              )}
              {job.featured && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobCard;

