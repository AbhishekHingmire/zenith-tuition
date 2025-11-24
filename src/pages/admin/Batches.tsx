import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

export default function Batches() {
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

        <Card>
          <CardHeader>
            <CardTitle>All Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Batch Management</h3>
              <p className="text-gray-600">This feature is under development</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
