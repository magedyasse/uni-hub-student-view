
import React, { useState } from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/table';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science', credits: 3 },
    { id: 2, code: 'MATH201', name: 'Calculus I', credits: 4 },
  ]);
  
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.credits) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const credits = Number(newCourse.credits);
    if (isNaN(credits) || credits <= 0) {
      toast({
        title: "Error",
        description: "Credits must be a positive number",
        variant: "destructive"
      });
      return;
    }
    
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    
    setCourses([...courses, {
      id: newId,
      code: newCourse.code,
      name: newCourse.name,
      credits: credits
    }]);
    
    setNewCourse({ code: '', name: '', credits: '' });
    
    toast({
      title: "Success",
      description: "Course added successfully",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="flex items-center gap-2 text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Course Management</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>Enter course information below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Course Code</Label>
                <Input 
                  id="code"
                  name="code"
                  placeholder="e.g. CS101" 
                  value={newCourse.code}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name" 
                  name="name"
                  placeholder="Enter course name" 
                  value={newCourse.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits" 
                  name="credits"
                  type="number"
                  placeholder="Enter credits" 
                  value={newCourse.credits}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button onClick={handleAddCourse} className="mt-2">
                Add Course
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
            <CardDescription>View all available courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length > 0 ? (
                  courses.map(course => (
                    <TableRow key={course.id}>
                      <TableCell>{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No courses found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Courses;
