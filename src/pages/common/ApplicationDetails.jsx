import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ApplicationDetails = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Application Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under development.</p>
          {id ? <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Application ID: {id}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationDetails;

