import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Users, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { mockBatches } from '@/data/mockData';

export default function Batches() {
  const [batches] = useState(mockBatches);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
            <p className="text-gray-600 mt-1">Create and manage class batches</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-5 h-5 mr-2" />
            Create Batch
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <Card key={batch.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{batch.name}</CardTitle>
                    <Badge variant="outline" className="mt-2">{batch.subject}</Badge>
                  </div>
                  <Badge className={batch.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}>
                    {batch.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Teacher:</span>
                  <span className="font-medium">{batch.teacher}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Schedule:</span>
                  <span className="font-medium text-xs">{batch.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium">{batch.enrolledStudents}/{batch.capacity}</span>
                </div>
                <div className="pt-3 border-t flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
