
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Book, UsersRound } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">University Management System</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Students
            </CardTitle>
            <CardDescription>Manage student information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, view, and manage student profiles</p>
            <Link to="/students">
              <Button>Manage Students</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Courses
            </CardTitle>
            <CardDescription>Manage course catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Add, view, and manage course information</p>
            <Link to="/courses">
              <Button>Manage Courses</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersRound className="h-5 w-5" />
              Enrollments
            </CardTitle>
            <CardDescription>Manage student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Enroll students in courses and view enrollments</p>
            <Link to="/enrollments">
              <Button>Manage Enrollments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
