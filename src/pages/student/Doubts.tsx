import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, MessageCircle, ThumbsUp, CheckCircle } from 'lucide-react';
import { mockDoubts } from '@/data/mockStudentData';
import { toast } from 'sonner';

export default function Doubts() {
  const [doubts, setDoubts] = useState(mockDoubts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingDoubt, setViewingDoubt] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    subject: '',
    chapter: '',
    tags: '',
  });

  const subjects = Array.from(new Set(mockDoubts.map(d => d.subject)));

  const filteredDoubts = doubts.filter(doubt => {
    const matchesSearch = doubt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doubt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doubt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || doubt.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || doubt.status === filterStatus;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleSubmitDoubt = () => {
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    
    const newDoubt = {
      id: `d${doubts.length + 1}`,
      question: formData.question,
      description: formData.description,
      subject: formData.subject,
      chapter: formData.chapter,
      tags: tagsArray,
      postedBy: {
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
      },
      postedDate: new Date(),
      status: 'pending' as const,
      viewCount: 0,
      upvotes: 0,
      answers: [],
    };
    
    setDoubts([newDoubt, ...doubts]);
    setDialogOpen(false);
    setFormData({ question: '', description: '', subject: '', chapter: '', tags: '' });
    toast.success('Your doubt has been posted!');
  };

  const handleViewDoubt = (doubt: any) => {
    setViewingDoubt(doubt);
    setViewDialogOpen(true);
  };

  const handleUpvote = (doubtId: string) => {
    setDoubts(doubts.map(d => 
      d.id === doubtId ? { ...d, upvotes: d.upvotes + 1 } : d
    ));
    toast.success('Upvoted!');
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Doubt Clearing</h1>
            <p className="text-sm text-muted-foreground mt-1">Ask questions and get answers</p>
          </div>
          <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Ask Doubt
          </Button>
        </div>

        {/* Search & Filters - Separate Rows on Mobile/Tablet */}
        <Card>
          <CardContent className="p-3 space-y-3">
            {/* Search Bar - Full Width Row */}
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search doubts by question, description, or tags..." 
                className="pl-8 h-10 text-sm w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters Row */}
            <div className="flex gap-2">
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger className="flex-1 h-9 text-xs">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="flex-1 h-9 text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Compact Doubts List */}
        <div className="space-y-3">
          {filteredDoubts.map((doubt) => (
            <Card key={doubt.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm line-clamp-1">{doubt.question}</h3>
                    <Badge className={doubt.status === 'answered' ? 'bg-secondary text-secondary-foreground shrink-0 text-xs' : 'bg-amber-100 text-amber-700 shrink-0 text-xs'}>
                      {doubt.status === 'answered' ? 'Answered' : 'Pending'}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{doubt.subject}</Badge>
                    <span>•</span>
                    <span>{doubt.postedDate.toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-xs">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 text-xs px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(doubt.id);
                        }}
                      >
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {doubt.upvotes}
                      </Button>
                      <span className="text-muted-foreground">{doubt.answers.length} answers</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleViewDoubt(doubt)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoubts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No doubts found</p>
            </CardContent>
          </Card>
        )}

        {/* Ask Doubt Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ask a Doubt</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Input
                  id="question"
                  placeholder="What is your question?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chapter">Chapter</Label>
                  <Input
                    id="chapter"
                    placeholder="e.g., Chapter 5"
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., algebra, equations"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitDoubt}>Submit Doubt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Doubt Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Doubt Details</DialogTitle>
            </DialogHeader>
            {viewingDoubt && (
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{viewingDoubt.question}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="font-medium">{viewingDoubt.postedBy.name}</span>
                    <span>•</span>
                    <span>{viewingDoubt.postedDate.toLocaleDateString()}</span>
                    <span>•</span>
                    <Badge variant="outline">{viewingDoubt.subject}</Badge>
                    {viewingDoubt.chapter && (
                      <>
                        <span>•</span>
                        <span>{viewingDoubt.chapter}</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{viewingDoubt.description}</p>
                  
                  {viewingDoubt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {viewingDoubt.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {viewingDoubt.answers.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">{viewingDoubt.answers.length} Answer{viewingDoubt.answers.length > 1 ? 's' : ''}</h4>
                    <div className="space-y-3">
                      {viewingDoubt.answers.map((answer: any) => (
                        <div key={answer.id} className={`p-3 rounded-lg ${answer.isVerified ? 'bg-secondary/10 border border-secondary' : 'bg-muted'}`}>
                          <div className="flex items-start gap-2 mb-2">
                            <img 
                              src={answer.answeredBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${answer.answeredBy.name}`}
                              alt={answer.answeredBy.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm">{answer.answeredBy.name}</span>
                                <Badge variant="outline" className="text-xs">{answer.answeredBy.role}</Badge>
                                {answer.isVerified && (
                                  <Badge className="bg-secondary text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{answer.postedDate.toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className="text-sm">{answer.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
