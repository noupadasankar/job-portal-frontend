import React, { useState } from "react";
import { Lock, Save } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/userService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      await userService.updatePassword(passwordForm);

      toast.success("Password updated successfully");

      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings.</p>
      </div>

      <Card className="glass-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-5">
            <div>
              <Label>Old Password</Label>
              <Input
                type="password"
                name="oldPassword"
                value={passwordForm.oldPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" loading={loading}>
              <Save className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;