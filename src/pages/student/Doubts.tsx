import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, MessageCircle, Eye, ThumbsUp, CheckCircle, User } from 'lucide-react';
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

  const handleAskDoubt = () => {
    setFormData({
      question: '',
      description: '',
      subject: '',
      chapter: '',
      tags: '',
    });
    setDialogOpen(true);
  };

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
    toast.success('Your doubt has been posted successfully!');
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Doubt Clearing</h1>
            <p className="text-muted-foreground mt-1">Ask questions and get answers from teachers</p>
          </div>
          <Button onClick={handleAskDoubt} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Ask a Doubt
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative sm:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search doubts..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
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

        {/* Doubts List */}
        <div className="space-y-4">
          {filteredDoubts.map((doubt) => (
            <Card key={doubt.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleViewDoubt(doubt)}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={doubt.postedBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${doubt.postedBy.name}`}
                    alt={doubt.postedBy.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-lg line-clamp-2">{doubt.question}</h3>
                      <Badge className={doubt.status === 'answered' ? 'bg-secondary text-secondary-foreground flex-shrink-0' : 'bg-amber-100 text-amber-700 flex-shrink-0'}>
                        {doubt.status === 'answered' ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Answered
                          </>
                        ) : (
                          'Pending'
                        )}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {doubt.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <Badge variant="outline">{doubt.subject}</Badge>
                      {doubt.chapter && <span>Chapter: {doubt.chapter}</span>}
                      <span>•</span>
                      <span>{doubt.postedBy.name}</span>
                      <span>•</span>
                      <span>{doubt.postedDate.toLocaleDateString()}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(doubt.id);
                        }}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {doubt.upvotes}
                      </Button>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        {doubt.answers.length} answers
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        {doubt.viewCount} views
                      </div>
                    </div>

                    {doubt.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doubt.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoubts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No doubts found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or ask a new question</p>
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
                  placeholder="Provide more details about your question..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <Label htmlFor="chapter">Chapter (Optional)</Label>
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
                  placeholder="e.g., algebra, equations, quadratic"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitDoubt} className="bg-primary hover:bg-primary/90">
                Submit Doubt
              </Button>
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
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={viewingDoubt.postedBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${viewingDoubt.postedBy.name}`}
                      alt={viewingDoubt.postedBy.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{viewingDoubt.question}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                    </div>
                    <Badge className={viewingDoubt.status === 'answered' ? 'bg-secondary text-secondary-foreground' : 'bg-amber-100 text-amber-700'}>
                      {viewingDoubt.status === 'answered' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Answered
                        </>
                      ) : (
                        'Pending'
                      )}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{viewingDoubt.description}</p>
                  
                  {viewingDoubt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {viewingDoubt.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {viewingDoubt.answers.length > 0 && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">{viewingDoubt.answers.length} Answer{viewingDoubt.answers.length > 1 ? 's' : ''}</h4>
                    <div className="space-y-4">
                      {viewingDoubt.answers.map((answer: any) => (
                        <div key={answer.id} className={`p-4 rounded-lg ${answer.isVerified ? 'bg-secondary/10 border border-secondary' : 'bg-muted'}`}>
                          <div className="flex items-start gap-3 mb-3">
                            <img 
                              src={answer.answeredBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${answer.answeredBy.name}`}
                              alt={answer.answeredBy.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{answer.answeredBy.name}</span>
                                <Badge variant="outline" className="text-xs">{answer.answeredBy.role}</Badge>
                                {answer.isVerified && (
                                  <Badge className="bg-secondary text-secondary-foreground text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{answer.postedDate.toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className="text-sm">{answer.answer}</p>
                          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                            <Button size="sm" variant="ghost" className="h-7">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              {answer.helpfulCount} helpful
                            </Button>
                          </div>
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
