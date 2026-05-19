import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import JobCard from "@/components/features/jobs/JobCard";
import EmptyState from "@/components/shared/EmptyState";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { savedJobService } from "@/services/savedJobService";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeJob = (item) => item.job || item.jobId || item.jobID;

  const mapJobForCard = (job) => ({
    id: job._id,
    title: job.title,
    company: job.postedBy?.company?.name || job.postedBy?.name || "Company",
    companyLogo: job.postedBy?.company?.logo?.url || job.postedBy?.avatar?.url,
    location: `${job.city || ""}, ${job.country || ""}`,
    type: job.jobType || "Full-time",
    salary: job.fixedSalary
      ? { min: job.fixedSalary, max: job.fixedSalary }
      : { min: job.salaryFrom, max: job.salaryTo },
    description: job.description,
    skills: job.skills || [],
    postedDate: job.jobPostedOn || job.createdAt,
    verified: true,
    easyApply: true,
    matchScore: 85,
    views: job.views || 0,
  });

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const data = await savedJobService.getSavedJobs();
      const jobs = (data.savedJobs || []).map(normalizeJob).filter(Boolean);
      setSavedJobs(jobs);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const handleRemoveSavedJob = async (jobId) => {
    try {
      await savedJobService.unsaveJob(jobId);
      setSavedJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Removed from saved jobs");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove saved job");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!savedJobs.length) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No Saved Jobs"
        description="Save jobs you like and find them here later."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Saved Jobs</h1>
        <p className="text-gray-500 mt-1">Your bookmarked job opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedJobs.map((job, index) => (
          <JobCard
            key={job._id}
            job={mapJobForCard(job)}
            index={index}
            isSaved={true}
            onSave={handleRemoveSavedJob}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedJobs;