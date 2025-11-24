import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Eye, Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const mockSubjects = [
  {
    id: '1',
    name: 'Mathematics',
    icon: '📐',
    batches: ['Grade 10-A', 'Grade 11-B', 'Grade 9-C'],
    totalChapters: 15,
    completedChapters: 10,
    completionPercentage: 67,
  },
  {
    id: '2',
    name: 'Physics',
    icon: '⚡',
    batches: ['Grade 11-A', 'Grade 12-B'],
    totalChapters: 12,
    completedChapters: 8,
    completionPercentage: 67,
  },
  {
    id: '3',
    name: 'Chemistry',
    icon: '🧪',
    batches: ['Grade 10-B'],
    totalChapters: 14,
    completedChapters: 5,
    completionPercentage: 36,
  },
];

export default function Syllabus() {
  const navigate = useNavigate();

  const handleViewSyllabus = (subjectId: string) => {
    navigate(`/teacher/syllabus/${subjectId}`);
  };

  const handleExportAll = () => {
    toast.success('Exporting all syllabi...');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Syllabus Management</h1>
            <p className="text-muted-foreground mt-1">Track and manage your subject syllabi</p>
          </div>
          <Button variant="outline" onClick={handleExportAll} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Subjects</p>
                  <p className="text-2xl font-bold">{mockSubjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg. Completion</p>
              <p className="text-2xl font-bold">
                {Math.round(mockSubjects.reduce((sum, s) => sum + s.completionPercentage, 0) / mockSubjects.length)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Chapters</p>
              <p className="text-2xl font-bold">
                {mockSubjects.reduce((sum, s) => sum + s.totalChapters, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Completed</p>
              <p className="text-2xl font-bold text-secondary">
                {mockSubjects.reduce((sum, s) => sum + s.completedChapters, 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {subject.totalChapters} chapters
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-semibold">{subject.completionPercentage}%</span>
                  </div>
                  <Progress value={subject.completionPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {subject.completedChapters} of {subject.totalChapters} chapters completed
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Teaching Batches:</p>
                  <div className="flex flex-wrap gap-1">
                    {subject.batches.map((batch, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {batch}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => handleViewSyllabus(subject.id)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Syllabus
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
