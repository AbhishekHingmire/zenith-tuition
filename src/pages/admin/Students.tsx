import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockStudents } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Students() {
  const navigate = useNavigate();
  const [students] = useState(mockStudents);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
            <p className="text-gray-600 mt-1">Manage all student records and information</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-5 h-5 mr-2" />
            Add Student
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Students ({students.length})</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search students..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Admission No</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Batch</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Parent Contact</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Attendance</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{student.admissionNo}</td>
                      <td className="px-4 py-4">
                        <Badge variant="outline">{student.batch}</Badge>
                      </td>
                      <td className="px-4 py-4 text-sm">{student.parentPhone}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-medium">{student.attendancePercentage}%</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <Badge className="bg-emerald-100 text-emerald-700">
                          {student.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/students/${student.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
