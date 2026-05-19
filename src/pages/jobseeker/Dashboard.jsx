import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Eye,
  Bookmark,
  TrendingUp,
  Briefcase,
  Target,
  Award,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
} from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/authStore';
import { formatRelativeTime, getInitials } from '@/lib/utils';
import EmptyState from '@/components/shared/EmptyState';

// Mock data - replace with actual API calls
const mockStats = {
  applicationsSubmitted: 24,
  interviewInvites: 5,
  profileViews: 142,
  savedJobs: 8,
};

const mockRecentApplications = [
  {
    id: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    companyLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=2D5649&color=fff',
    appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: 'Under Review',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
  },
  {
    id: 2,
    jobTitle: 'Full Stack Engineer',
    company: 'StartupXYZ',
    companyLogo: 'https://ui-avatars.com/api/?name=StartupXYZ&background=4ECDC4&color=fff',
    appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: 'Interview Scheduled',
    location: 'Remote',
    salary: '$100k - $130k',
  },
  {
    id: 3,
    jobTitle: 'React Developer',
    company: 'Digital Solutions',
    companyLogo: 'https://ui-avatars.com/api/?name=Digital+Solutions&background=6366f1&color=fff',
    appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'Rejected',
    location: 'New York, NY',
    salary: '$90k - $110k',
  },
];

const mockRecommendedJobs = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    logo: 'https://ui-avatars.com/api/?name=Creative+Agency&background=ec4899&color=fff',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    matchScore: 95,
    salary: '$80k - $100k',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovation Labs',
    logo: 'https://ui-avatars.com/api/?name=Innovation+Labs&background=f59e0b&color=fff',
    location: 'Austin, TX',
    type: 'Full-time',
    matchScore: 88,
    salary: '$110k - $140k',
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    logo: 'https://ui-avatars.com/api/?name=Cloud+Systems&background=10b981&color=fff',
    location: 'Seattle, WA',
    type: 'Contract',
    matchScore: 82,
    salary: '$95k - $125k',
  },
];

const mockUpcomingInterviews = [
  {
    id: 1,
    company: 'StartupXYZ',
    position: 'Full Stack Engineer',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: '2:00 PM',
    type: 'Video Call',
    interviewer: 'John Smith',
  },
  {
    id: 2,
    company: 'TechCorp Inc.',
    position: 'Senior Frontend Developer',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    time: '10:00 AM',
    type: 'Phone Screen',
    interviewer: 'Sarah Johnson',
  },
];

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [profileCompletion, setProfileCompletion] = useState(75);

  const getStatusColor = (status) => {
    const colors = {
      'Under Review': 'warning',
      'Interview Scheduled': 'info',
      'Rejected': 'destructive',
      'Accepted': 'success',
    };
    return colors[status] || 'default';
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's what's happening with your job search today
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/jobs')}>
              <Briefcase className="w-4 h-4 mr-2" />
              Browse Jobs
            </Button>
            <Button onClick={() => navigate('/profile')}>
              <Target className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </div>

        {/* Profile Completion */}
        {profileCompletion < 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-bold text-primary">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              Complete your profile to increase your chances of getting hired
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Applications Sent"
          value={mockStats.applicationsSubmitted}
          icon={FileText}
          trend="up"
          trendValue={12}
          color="primary"
          delay={0}
        />
        <StatsCard
          title="Interview Invites"
          value={mockStats.interviewInvites}
          icon={Calendar}
          trend="up"
          trendValue={25}
          color="accent"
          delay={0.1}
        />
        <StatsCard
          title="Profile Views"
          value={mockStats.profileViews}
          icon={Eye}
          trend="up"
          trendValue={8}
          color="success"
          delay={0.2}
        />
        <StatsCard
          title="Saved Jobs"
          value={mockStats.savedJobs}
          icon={Bookmark}
          color="warning"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Applications & Interviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Applications */}
          <Card className="glass-hover">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track your latest job applications</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/applications')}>
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentApplications.map((application, index) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => navigate(`/application/${application.id}`)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.companyLogo} />
                      <AvatarFallback>{getInitials(application.company)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-sm truncate">
                            {application.jobTitle}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {application.company}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {application.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {application.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatRelativeTime(application.appliedDate)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="glass-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Interviews
              </CardTitle>
              <CardDescription>Prepare for your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              {mockUpcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {mockUpcomingInterviews.map((interview, index) => (
                    <motion.div
                      key={interview.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold">{interview.position}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {interview.company} • {interview.interviewer}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {interview.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {interview.time}
                          </span>
                          <Badge variant="outline">{interview.type}</Badge>
                        </div>
                      </div>

                      <Button size="sm" variant="outline">
                        Join
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Calendar}
                  title="No upcoming interviews"
                  description="You don't have any interviews scheduled yet"
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Recommended Jobs & Activity */}
        <div className="space-y-6">
          {/* Recommended Jobs */}
          <Card className="glass-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Recommended Jobs
              </CardTitle>
              <CardDescription>Based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecommendedJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-accent/50 transition-all cursor-pointer group"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={job.logo} />
                        <AvatarFallback>{getInitials(job.company)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate group-hover:text-accent transition-colors">
                          {job.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {job.company}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {job.matchScore}% Match
                          </Badge>
                          <span className="text-xs text-gray-500">{job.type}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/jobs')}>
                View More Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Skill Gap Analysis */}
          <Card className="glass-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Skill Development
              </CardTitle>
              <CardDescription>Improve your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { skill: 'React.js', proficiency: 85 },
                  { skill: 'Node.js', proficiency: 70 },
                  { skill: 'TypeScript', proficiency: 60 },
                  { skill: 'AWS', proficiency: 45 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.skill}</span>
                      <span className="text-sm text-gray-500">{item.proficiency}%</span>
                    </div>
                    <Progress value={item.proficiency} className="h-2" />
                  </div>
                ))}
              </div>

              <Button variant="link" className="w-full mt-4 text-primary">
                Take Skill Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
