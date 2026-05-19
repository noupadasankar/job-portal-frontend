import React, { useEffect, useState } from "react";
import { Camera, Save, User } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/authStore";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/utils";

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    headline: "",
    bio: "",
    location: "",
    skills: "",
    experienceLevel: "",
    portfolio: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        headline: user.profile?.headline || "",
        bio: user.profile?.bio || "",
        location: user.profile?.location || "",
        skills: user.profile?.skills?.join(", ") || "",
        experienceLevel: user.profile?.experienceLevel || "",
        portfolio: user.profile?.portfolio || "",
        linkedin: user.profile?.linkedin || "",
        github: user.profile?.github || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        phone: form.phone,
        headline: form.headline,
        bio: form.bio,
        location: form.location,
        skills: form.skills,
        experienceLevel: form.experienceLevel,
        portfolio: form.portfolio,
        linkedin: form.linkedin,
        github: form.github,
      };

      const data = await userService.updateProfile(payload);
      setUser(data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setAvatarLoading(true);
      const data = await userService.uploadAvatar(file);
      setUser(data.user);
      toast.success("Avatar uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  if (!user) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-500 mt-1">Manage your job seeker profile.</p>
      </div>

      <Card className="glass-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-5 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar?.url} />
              <AvatarFallback className="text-xl bg-primary text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <Button type="button" disabled={avatarLoading}>
                  <Camera className="w-4 h-4 mr-2" />
                  {avatarLoading ? "Uploading..." : "Upload Avatar"}
                </Button>
              </Label>

              <input
                id="avatar"
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                className="hidden"
                onChange={handleAvatarUpload}
              />

              <p className="text-xs text-gray-500 mt-2">
                PNG, JPEG or WEBP recommended.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label>Name</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div>
              <Label>Phone</Label>
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div>
              <Label>Professional Headline</Label>
              <Input
                name="headline"
                placeholder="MERN Stack Developer"
                value={form.headline}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                name="location"
                placeholder="Delhi, India"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                name="experienceLevel"
                placeholder="Entry Level / Mid Level / Senior"
                value={form.experienceLevel}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Skills</Label>
              <Input
                name="skills"
                placeholder="React, Node.js, MongoDB"
                value={form.skills}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Portfolio</Label>
              <Input
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>LinkedIn</Label>
              <Input
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>GitHub</Label>
              <Input
                name="github"
                value={form.github}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea
                name="bio"
                rows={5}
                placeholder="Write a short summary about yourself..."
                value={form.bio}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" loading={loading}>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;