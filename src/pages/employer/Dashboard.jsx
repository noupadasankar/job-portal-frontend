import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  PlusCircle,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  ArrowRight,
} from 'lucide-react';
import StatsCard from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/store/authStore';
import { formatRelativeTime, getInitials, formatSalary } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const mockStats = {
  activeJobs: 12,
  totalApplications: 156,
  interviewsScheduled: 8,
  positionsFilled: 3,
};

const mockActiveJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    applications: 24,
    views: 312,
    status: 'Active',
    salary: { min: 120000, max: 150000 },
  },
  {
    id: 2,
    title: 'Product Manager',
    postedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    applications: 18,
    views: 245,
    status: 'Active',
    salary: { min: 130000, max: 160000 },
  },
  {
    id: 3,
    title: 'UX Designer',
    postedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    applications: 31,
    views: 428,
    status: 'Active',
    salary: { min: 90000, max: 120000 },
  },
];

const mockRecentApplications = [
  {
    id: 1,
    candidateName: 'Sarah Johnson',
    candidateAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=2D5649&color=fff',
    position: 'Senior Frontend Developer',
    appliedDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
    matchScore: 95,
    status: 'New',
    experience: '5 years',
  },
  {
    id: 2,
    candidateName: 'Michael Chen',
    candidateAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=4ECDC4&color=fff',
    position: 'Product Manager',
    appliedDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
    matchScore: 88,
    status: 'Reviewing',
    experience: '7 years',
  },
  {
    id: 3,
    candidateName: 'Emily Rodriguez',
    candidateAvatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=ec4899&color=fff',
    position: 'UX Designer',
    appliedDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
    matchScore: 92,
    status: 'Shortlisted',
    experience: '4 years',
  },
];

const mockUpcomingInterviews = [
  {
    id: 1,
    candidateName: 'Alex Thompson',
    position: 'Senior Frontend Developer',
    date: new Date(Date.now() + 2 * 60 * 60 * 1000),
    time: '2:00 PM',
    type: 'Technical Round',
  },
  {
    id: 2,
    candidateName: 'Jessica Lee',
    position: 'Product Manager',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    time: '10:00 AM',
    type: 'Final Round',
  },
];

const hiringFunnelData = [
  { stage: 'Applied', count: 156, color: 'bg-blue-500' },
  { stage: 'Screening', count: 89, color: 'bg-yellow-500' },
  { stage: 'Interview', count: 34, color: 'bg-orange-500' },
  { stage: 'Offer', count: 12, color: 'bg-green-500' },
  { stage: 'Hired', count: 8, color: 'bg-primary' },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const getStatusColor = (status) => {
    const colors = {
      'New': 'info',
      'Reviewing': 'warning',
      'Shortlisted': 'success',
      'Rejected': 'destructive',
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
              Hello, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Here's your hiring overview for today
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/applications')}>
              <Users className="w-4 h-4 mr-2" />
              View Applications
            </Button>
            <Button onClick={() => navigate('/post-job')} className="gradient-primary">
              <PlusCircle className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Jobs"
          value={mockStats.activeJobs}
          icon={Briefcase}
          trend="up"
          trendValue={8}
          color="primary"
          delay={0}
        />
        <StatsCard
          title="Total Applications"
          value={mockStats.totalApplications}
          icon={Users}
          trend="up"
          trendValue={15}
          color="accent"
          delay={0.1}
        />
        <StatsCard
          title="Interviews Scheduled"
          value={mockStats.interviewsScheduled}
          icon={Calendar}
          color="warning"
          delay={0.2}
        />
        <StatsCard
          title="Positions Filled"
          value={mockStats.positionsFilled}
          icon={CheckCircle}
          trend="up"
          trendValue={50}
          color="success"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Jobs */}
          <Card className="glass-hover">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Job Listings</CardTitle>
                <CardDescription>Manage your open positions</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/my-jobs')}>
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockActiveJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-primary/50 transition-all cursor-pointer"
                    onClick={() => navigate(`/job/${job.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          Posted {formatRelativeTime(job.postedDate)} • {formatSalary(job.salary.min, job.salary.max)}
                        </p>
                      </div>
                      <Badge variant="success">{job.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{job.applications}</p>
                          <p className="text-xs text-gray-500">Applications</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold">{job.views}</p>
                          <p className="text-xs text-gray-500">Views</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" className="flex-1">
                        View Applications
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card className="glass-hover">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest candidates to review</CardDescription>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="reviewing">Reviewing</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentApplications.map((application, index) => (
                  <motion.div
                    key={application.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-accent/50 transition-all cursor-pointer"
                    onClick={() => navigate(`/application/${application.id}`)}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.candidateAvatar} />
                      <AvatarFallback>{getInitials(application.candidateName)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-sm">
                            {application.candidateName}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Applied for {application.position}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 mt-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {application.matchScore}% Match
                          </Badge>
                        </div>
                        <span className="text-gray-500">
                          {application.experience} experience
                        </span>
                        <span className="text-gray-500">
                          {formatRelativeTime(application.appliedDate)}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                        <Button size="sm">
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Hiring Funnel */}
          <Card className="glass-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Hiring Funnel
              </CardTitle>
              <CardDescription>Application pipeline overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hiringFunnelData.map((stage, index) => {
                  const percentage = (stage.count / hiringFunnelData[0].count) * 100;
                  return (
                    <motion.div
                      key={stage.stage}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{stage.stage}</span>
                        <span className="text-sm font-bold">{stage.count}</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${stage.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <Button variant="link" className="w-full mt-4 text-primary">
                View Detailed Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="glass-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUpcomingInterviews.map((interview, index) => (
                  <motion.div
                    key={interview.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm">
                          {interview.candidateName}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {interview.position}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>
                        {interview.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                        {' at '}
                        {interview.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Interviews
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Avg. Time to Hire</span>
                    <span className="text-sm font-bold">23 days</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Application Response Rate</span>
                    <span className="text-sm font-bold">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Interview Success Rate</span>
                    <span className="text-sm font-bold">42%</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
