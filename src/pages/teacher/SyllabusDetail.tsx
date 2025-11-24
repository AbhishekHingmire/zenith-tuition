import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Clock, 
  Circle, 
  Plus, 
  Edit, 
  Download,
  Share,
  FileText
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const mockChapters = [
  {
    id: '1',
    number: 1,
    name: 'Real Numbers',
    topics: [
      { id: '1-1', name: 'Euclid\'s Division Lemma', status: 'completed', plannedDate: '2024-01-15', actualDate: '2024-01-14' },
      { id: '1-2', name: 'Fundamental Theorem of Arithmetic', status: 'completed', plannedDate: '2024-01-20', actualDate: '2024-01-19' },
      { id: '1-3', name: 'Revisiting Irrational Numbers', status: 'in-progress', plannedDate: '2024-01-25', actualDate: null },
    ],
  },
  {
    id: '2',
    number: 2,
    name: 'Polynomials',
    topics: [
      { id: '2-1', name: 'Geometrical Meaning of Zeroes', status: 'not-started', plannedDate: '2024-02-01', actualDate: null },
      { id: '2-2', name: 'Relationship between Zeroes and Coefficients', status: 'not-started', plannedDate: '2024-02-05', actualDate: null },
      { id: '2-3', name: 'Division Algorithm', status: 'not-started', plannedDate: '2024-02-10', actualDate: null },
    ],
  },
];

export default function SyllabusDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState(mockChapters);
  const [lessonPlanOpen, setLessonPlanOpen] = useState(false);
  const [addChapterOpen, setAddChapterOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);

  const [lessonPlan, setLessonPlan] = useState({
    objectives: '',
    method: '',
    resources: '',
    duration: '',
    homework: '',
    assessment: '',
  });

  const [newChapter, setNewChapter] = useState({
    name: '',
    topics: [''],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-secondary" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-amber-600" />;
      default: return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-secondary text-secondary-foreground">Completed</Badge>;
      case 'in-progress': return <Badge className="bg-amber-100 text-amber-700">In Progress</Badge>;
      default: return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const handleMarkComplete = (chapterId: string, topicId: string) => {
    setChapters(chapters.map(ch => 
      ch.id === chapterId ? {
        ...ch,
        topics: ch.topics.map(t => 
          t.id === topicId ? { ...t, status: 'completed', actualDate: new Date().toISOString().split('T')[0] } : t
        )
      } : ch
    ));
    toast.success('Topic marked as completed');
  };

  const handleCreateLessonPlan = (topic: any) => {
    setSelectedTopic(topic);
    setLessonPlanOpen(true);
  };

  const handleSaveLessonPlan = () => {
    toast.success(`Lesson plan saved for ${selectedTopic.name}`);
    setLessonPlanOpen(false);
    setLessonPlan({
      objectives: '',
      method: '',
      resources: '',
      duration: '',
      homework: '',
      assessment: '',
    });
  };

  const handleAddChapter = () => {
    const newId = String(chapters.length + 1);
    const newChapterData = {
      id: newId,
      number: chapters.length + 1,
      name: newChapter.name,
      topics: newChapter.topics.filter(t => t.trim()).map((name, idx) => ({
        id: `${newId}-${idx + 1}`,
        name,
        status: 'not-started' as const,
        plannedDate: null,
        actualDate: null,
      })),
    };
    setChapters([...chapters, newChapterData]);
    setAddChapterOpen(false);
    setNewChapter({ name: '', topics: [''] });
    toast.success('Chapter added successfully');
  };

  const completedTopics = chapters.reduce((sum, ch) => 
    sum + ch.topics.filter(t => t.status === 'completed').length, 0
  );
  const totalTopics = chapters.reduce((sum, ch) => sum + ch.topics.length, 0);
  const completionPercentage = Math.round((completedTopics / totalTopics) * 100);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button variant="ghost" onClick={() => navigate('/teacher/syllabus')} className="mb-2">
              ← Back to Syllabi
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold">Mathematics - Grade 10-A</h1>
            <p className="text-muted-foreground mt-1">Detailed syllabus and lesson planning</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast.info('Sharing syllabus...')}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={() => toast.success('Exporting syllabus...')}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-bold">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground">
                {completedTopics} of {totalTopics} topics completed across {chapters.length} chapters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Add Chapter Button */}
        <div className="flex justify-end">
          <Button onClick={() => setAddChapterOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Chapter
          </Button>
        </div>

        {/* Chapters & Topics */}
        <Accordion type="multiple" className="space-y-4">
          {chapters.map((chapter) => {
            const chapterCompleted = chapter.topics.filter(t => t.status === 'completed').length;
            const chapterProgress = Math.round((chapterCompleted / chapter.topics.length) * 100);

            return (
              <Card key={chapter.id}>
                <AccordionItem value={chapter.id} className="border-0">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-lg">
                            Chapter {chapter.number}: {chapter.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {chapterCompleted} of {chapter.topics.length} topics completed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32">
                          <Progress value={chapterProgress} className="h-2" />
                        </div>
                        <span className="text-sm font-semibold w-12 text-right">
                          {chapterProgress}%
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-3 mt-4">
                      {chapter.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3 flex-1">
                            {getStatusIcon(topic.status)}
                            <div className="flex-1">
                              <p className="font-medium">{topic.name}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                                {topic.plannedDate && (
                                  <span>Planned: {new Date(topic.plannedDate).toLocaleDateString()}</span>
                                )}
                                {topic.actualDate && (
                                  <span className="text-secondary">
                                    Completed: {new Date(topic.actualDate).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(topic.status)}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCreateLessonPlan(topic)}
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Lesson Plan
                            </Button>
                            {topic.status !== 'completed' && (
                              <Button
                                size="sm"
                                className="bg-secondary hover:bg-secondary/90"
                                onClick={() => handleMarkComplete(chapter.id, topic.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            );
          })}
        </Accordion>

        {/* Lesson Plan Dialog */}
        <Dialog open={lessonPlanOpen} onOpenChange={setLessonPlanOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Lesson Plan</DialogTitle>
              <p className="text-sm text-muted-foreground">{selectedTopic?.name}</p>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="objectives">Learning Objectives *</Label>
                <Textarea
                  id="objectives"
                  placeholder="What should students learn from this lesson?"
                  value={lessonPlan.objectives}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, objectives: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Teaching Method *</Label>
                <Select value={lessonPlan.method} onValueChange={(value) => setLessonPlan({ ...lessonPlan, method: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teaching method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lecture">Lecture</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="group-work">Group Work</SelectItem>
                    <SelectItem value="lab">Lab</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="discussion">Discussion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resources">Resources Needed</Label>
                <Textarea
                  id="resources"
                  placeholder="Materials, equipment, technology needed..."
                  value={lessonPlan.resources}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, resources: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 45 minutes"
                  value={lessonPlan.duration}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="homework">Homework/Assignment</Label>
                <Textarea
                  id="homework"
                  placeholder="What should students do after class?"
                  value={lessonPlan.homework}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, homework: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assessment">Assessment Method</Label>
                <Textarea
                  id="assessment"
                  placeholder="How will you assess student learning?"
                  value={lessonPlan.assessment}
                  onChange={(e) => setLessonPlan({ ...lessonPlan, assessment: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setLessonPlanOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveLessonPlan} className="bg-primary hover:bg-primary/90">
                Save Lesson Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Chapter Dialog */}
        <Dialog open={addChapterOpen} onOpenChange={setAddChapterOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Chapter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="chapterName">Chapter Name *</Label>
                <Input
                  id="chapterName"
                  placeholder="e.g., Quadratic Equations"
                  value={newChapter.name}
                  onChange={(e) => setNewChapter({ ...newChapter, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Topics</Label>
                {newChapter.topics.map((topic, idx) => (
                  <Input
                    key={idx}
                    placeholder={`Topic ${idx + 1}`}
                    value={topic}
                    onChange={(e) => {
                      const newTopics = [...newChapter.topics];
                      newTopics[idx] = e.target.value;
                      setNewChapter({ ...newChapter, topics: newTopics });
                    }}
                  />
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNewChapter({ ...newChapter, topics: [...newChapter.topics, ''] })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Topic
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddChapterOpen(false)}>Cancel</Button>
              <Button onClick={handleAddChapter} className="bg-primary hover:bg-primary/90">
                Add Chapter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
