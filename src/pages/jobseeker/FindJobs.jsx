import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, ArrowUpDown } from 'lucide-react';
import JobCard from '@/components/features/jobs/JobCard';
import JobFilters from '@/components/features/jobs/JobFilters';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useDebounce } from '@/hooks/useDebounce';

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    companyLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=2D5649&color=fff',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: { min: 120000, max: 150000 },
    description: 'We are looking for an experienced Frontend Developer to join our team...',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'GraphQL'],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    verified: true,
    easyApply: true,
    featured: true,
    matchScore: 95,
    views: 324,
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    companyLogo: 'https://ui-avatars.com/api/?name=StartupXYZ&background=4ECDC4&color=fff',
    location: 'Remote',
    type: 'Full-time',
    salary: { min: 100000, max: 130000 },
    description: 'Join our fast-growing startup as a Full Stack Engineer...',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS', 'Docker'],
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    verified: true,
    easyApply: true,
    matchScore: 88,
    views: 256,
  },
  {
    id: 3,
    title: 'Product Designer',
    company: 'Creative Studio',
    companyLogo: 'https://ui-avatars.com/api/?name=Creative+Studio&background=ec4899&color=fff',
    location: 'New York, NY',
    type: 'Contract',
    salary: { min: 80000, max: 110000 },
    description: 'We need a talented Product Designer to craft beautiful experiences...',
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Design Systems'],
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    verified: false,
    easyApply: false,
    matchScore: 76,
    views: 189,
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Cloud Solutions Inc.',
    companyLogo: 'https://ui-avatars.com/api/?name=Cloud+Solutions&background=10b981&color=fff',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: { min: 110000, max: 140000 },
    description: 'Help us build and maintain scalable cloud infrastructure...',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker'],
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    verified: true,
    easyApply: true,
    featured: false,
    matchScore: 82,
    views: 412,
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'AI Innovations',
    companyLogo: 'https://ui-avatars.com/api/?name=AI+Innovations&background=6366f1&color=fff',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: { min: 130000, max: 170000 },
    description: 'Work on cutting-edge machine learning projects...',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Statistics'],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    verified: true,
    easyApply: false,
    featured: true,
    matchScore: 91,
    views: 567,
  },
  {
    id: 6,
    title: 'Mobile Developer',
    company: 'App Masters',
    companyLogo: 'https://ui-avatars.com/api/?name=App+Masters&background=f59e0b&color=fff',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: { min: 95000, max: 125000 },
    description: 'Build amazing mobile experiences for iOS and Android...',
    skills: ['React Native', 'iOS', 'Android', 'Firebase', 'Redux'],
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    verified: false,
    easyApply: true,
    matchScore: 79,
    views: 298,
  },
];

const FindJobs = () => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: [],
    workplaceType: [],
    experienceLevel: [],
    salaryRange: [0, 200000],
    postedDate: 'any',
  });
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('relevance');
  const [loading, setLoading] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let jobs = [...mockJobs];

      // Apply filters
      if (debouncedSearch) {
        jobs = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            job.company.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
      }

      if (filters.location) {
        jobs = jobs.filter((job) =>
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.jobType?.length > 0) {
        jobs = jobs.filter((job) =>
          filters.jobType.some((type) =>
            job.type.toLowerCase().includes(type.toLowerCase())
          )
        );
      }

      // Apply sorting
      if (sortBy === 'newest') {
        jobs.sort((a, b) => b.postedDate - a.postedDate);
      } else if (sortBy === 'salary-high') {
        jobs.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
      } else if (sortBy === 'match') {
        jobs.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      }

      setFilteredJobs(jobs);
      setLoading(false);
    }, 500);
  }, [debouncedSearch, filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      location: '',
      jobType: [],
      workplaceType: [],
      experienceLevel: [],
      salaryRange: [0, 200000],
      postedDate: 'any',
    });
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (key === 'salaryRange') return value[0] !== 0 || value[1] !== 200000;
      if (key === 'postedDate') return value !== 'any';
      return value !== '';
    }
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover thousands of job opportunities from top companies
        </p>
      </motion.div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <JobFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6 flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-foreground">
                  {filteredJobs.length}
                </span>{' '}
                jobs found
              </p>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="match">Best Match</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Jobs Grid/List */}
          {loading ? (
            <LoadingSpinner />
          ) : filteredJobs.length === 0 ? (
            <EmptyState
              icon={List}
              title="No jobs found"
              description="Try adjusting your filters or search criteria"
              actionLabel="Reset Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredJobs.map((job, index) => (
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                  onSave={handleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {!loading && filteredJobs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJobs;