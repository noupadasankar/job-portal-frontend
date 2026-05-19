import React, { useEffect, useState } from "react";
import { FileText, Trash2, Eye, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { applicationService } from "@/services/applicationService";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import EmptyState from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await applicationService.getMyApplications();
      setApplications(data.applications || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this application?");
    if (!confirmDelete) return;

    try {
      await applicationService.deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Under Review":
        return "warning";
      case "Interview Scheduled":
        return "info";
      case "Offer":
      case "Hired":
        return "success";
      case "Rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!applications.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No Applications Found"
        description="You have not applied to any jobs yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="text-gray-500 mt-1">Track all jobs you applied for.</p>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app._id} className="glass-hover">
            <CardContent className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-semibold">
                      {app.jobId?.title || "Job Title Not Available"}
                    </h3>
                    <Badge variant={getStatusVariant(app.status)}>
                      {app.status || "Applied"}
                    </Badge>
                  </div>

                  <p className="text-gray-600">
                    {app.employerID?.user?.company?.name ||
                      app.employerID?.user?.name ||
                      "Company"}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {app.jobId?.city}, {app.jobId?.country}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(app.createdAt || app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm line-clamp-2">
                    <strong>Cover Letter:</strong> {app.coverLetter}
                  </p>
                </div>

                <div className="flex gap-2">
                  {app.resume?.url && (
                    <a href={app.resume.url} target="_blank" rel="noreferrer">
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Resume
                      </Button>
                    </a>
                  )}

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(app._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;