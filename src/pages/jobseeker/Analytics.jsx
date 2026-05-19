import React, { useEffect, useState } from "react";
import { BarChart3, Bookmark, Briefcase, FileText, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { analyticsService } from "@/services/analyticsService";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import StatsCard from "@/components/shared/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#2D5649", "#4ECDC4", "#F59E0B", "#10B981", "#EF4444", "#6366F1"];

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await analyticsService.getJobSeekerAnalytics();
      setData(res);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner />;

  const statusChartData = Object.entries(data?.statusCounts || {}).map(
    ([name, value]) => ({ name, value })
  );

  const categoryData = data?.applicationsByCategory || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Career Insights</h1>
        <p className="text-gray-500 mt-1">
          Understand your application performance and job search activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Applications"
          value={data?.stats?.totalApplications || 0}
          icon={FileText}
          color="primary"
        />
        <StatsCard
          title="Saved Jobs"
          value={data?.stats?.savedJobs || 0}
          icon={Bookmark}
          color="accent"
        />
        <StatsCard
          title="Active Jobs"
          value={data?.stats?.activeJobs || 0}
          icon={Briefcase}
          color="success"
        />
        <StatsCard
          title="Success Rate"
          value={`${data?.stats?.successRate || 0}%`}
          icon={TrendingUp}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Application Status
            </CardTitle>
          </CardHeader>

          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {statusChartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-hover">
          <CardHeader>
            <CardTitle>Applications By Category</CardTitle>
          </CardHeader>

          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2D5649" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;