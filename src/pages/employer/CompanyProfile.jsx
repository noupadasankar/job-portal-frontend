import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CompanyProfile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under development.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyProfile;

