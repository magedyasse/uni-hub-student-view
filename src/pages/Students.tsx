
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

interface Student {
  id: number;
  name: string;
  email: string;
}

const Students = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', email: 'john@university.edu' },
    { id: 2, name: 'Jane Smith', email: 'jane@university.edu' },
  ]);
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    
    setStudents([...students, {
      id: newId,
      name: newStudent.name,
      email: newStudent.email
    }]);
    
    setNewStudent({ name: '', email: '' });
    
    toast({
      title: "Success",
      description: "Student added successfully",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="flex items-center gap-2 text-primary mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Student Management</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>Enter student information below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Student Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Enter student name" 
                  value={newStudent.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email" 
                  name="email"
                  type="email"
                  placeholder="Enter student email" 
                  value={newStudent.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button onClick={handleAddStudent} className="mt-2">
                Add Student
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
            <CardDescription>View all registered students</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length > 0 ? (
                  students.map(student => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No students found</TableCell>
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

export default Students;
