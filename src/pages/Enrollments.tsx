
import React, { useState } from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/table';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent 
} from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  code: string;
  name: string;
}

interface Enrollment {
  id: number;
  studentId: number;
  studentName: string;
  courseId: number;
  courseCode: string;
  courseName: string;
  enrollmentDate: string;
}

const Enrollments = () => {
  // Sample data
  const students: Student[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  
  const courses: Course[] = [
    { id: 1, code: 'CS101', name: 'Introduction to Computer Science' },
    { id: 2, code: 'MATH201', name: 'Calculus I' }
  ];
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([
    { 
      id: 1, 
      studentId: 1, 
      studentName: 'John Doe', 
      courseId: 2, 
      courseCode: 'MATH201', 
      courseName: 'Calculus I',
      enrollmentDate: '2025-04-10' 
    }
  ]);
  
  const [newEnrollment, setNewEnrollment] = useState({
    studentId: '',
    courseId: ''
  });

  const handleSelectChange = (name: string, value: string) => {
    setNewEnrollment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddEnrollment = () => {
    if (!newEnrollment.studentId || !newEnrollment.courseId) {
      toast({
        title: "Error",
        description: "Please select both student and course",
        variant: "destructive"
      });
      return;
    }
    
    const studentId = parseInt(newEnrollment.studentId);
    const courseId = parseInt(newEnrollment.courseId);
    
    // Check if enrollment already exists
    const exists = enrollments.some(
      e => e.studentId === studentId && e.courseId === courseId
    );
    
    if (exists) {
      toast({
        title: "Error",
        description: "This student is already enrolled in this course",
        variant: "destructive"
      });
      return;
    }
    
    const student = students.find(s => s.id === studentId);
    const course = courses.find(c => c.id === courseId);
    
    if (!student || !course) {
      toast({
        title: "Error",
        description: "Invalid student or course selection",
        variant: "destructive"
      });
      return;
    }
    
    const newId = enrollments.length > 0 ? Math.max(...enrollments.map(e => e.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];
    
    setEnrollments([...enrollments, {
      id: newId,
      studentId,
      studentName: student.name,
      courseId,
      courseCode: course.code,
      courseName: course.name,
      enrollmentDate: today
    }]);
    
    setNewEnrollment({ studentId: '', courseId: '' });
    
    toast({
      title: "Success",
      description: "Student enrolled successfully",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="flex items-center gap-2 text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Enrollment Management</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Enroll Student in Course</CardTitle>
            <CardDescription>Select student and course to enroll</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="student">Student</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange('studentId', value)}
                  value={newEnrollment.studentId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(student => (
                      <SelectItem key={student.id} value={student.id.toString()}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('courseId', value)}
                  value={newEnrollment.courseId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.code}: {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleAddEnrollment} className="mt-2">
                Enroll Student
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Enrollment List</CardTitle>
            <CardDescription>View all student enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enrollments.length > 0 ? (
                  enrollments.map(enrollment => (
                    <TableRow key={enrollment.id}>
                      <TableCell>{enrollment.studentName}</TableCell>
                      <TableCell>{enrollment.courseCode}: {enrollment.courseName}</TableCell>
                      <TableCell>{enrollment.enrollmentDate}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No enrollments found</TableCell>
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

export default Enrollments;
