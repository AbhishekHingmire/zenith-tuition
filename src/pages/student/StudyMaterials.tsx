import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, FileText, Video, Download, Eye, Star, Play } from 'lucide-react';
import { mockStudyMaterials } from '@/data/mockStudentData';
import { toast } from 'sonner';

export default function StudyMaterials() {
  const [materials] = useState(mockStudyMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [viewingMaterial, setViewingMaterial] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const subjects = Array.from(new Set(mockStudyMaterials.map(m => m.subject)));

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.chapter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = filterSubject === 'all' || material.subject === filterSubject;
    const matchesType = filterType === 'all' || material.type === filterType;
    const matchesDifficulty = filterDifficulty === 'all' || material.difficulty === filterDifficulty;
    
    return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
  });

  const handleView = (material: any) => {
    setViewingMaterial(material);
    setViewDialogOpen(true);
  };

  const handleDownload = (material: any) => {
    toast.success(`Downloading ${material.title}`);
  };

  const getTypeIcon = (type: string) => {
    return type === 'video' ? <Video className="w-10 h-10" /> : <FileText className="w-10 h-10" />;
  };

  return (
    <MainLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Study Materials</h1>
          <p className="text-sm text-muted-foreground mt-1">Access notes, videos, and practice materials</p>
        </div>

        {/* Search & Filters - Separate Rows on Mobile/Tablet */}
        <Card>
          <CardContent className="p-3 space-y-3">
            {/* Search Bar - Full Width Row */}
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search materials by title, chapter, or tags..." 
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
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="flex-1 h-9 text-xs">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="flex-1 h-9 text-xs">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Compact Material Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleView(material)}>
              <CardContent className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center text-primary shrink-0">
                    {getTypeIcon(material.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold line-clamp-2">{material.title}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-[10px] px-1 py-0">{material.subject}</Badge>
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">{material.type.toUpperCase()}</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full h-7 text-xs" onClick={(e) => { e.stopPropagation(); handleView(material); }}>
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No materials found</p>
            </CardContent>
          </Card>
        )}

        {/* View Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Material Details</DialogTitle>
            </DialogHeader>
            {viewingMaterial && (
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{viewingMaterial.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{viewingMaterial.subject}</Badge>
                    <Badge variant="secondary">{viewingMaterial.type.toUpperCase()}</Badge>
                    {viewingMaterial.difficulty && (
                      <Badge>{viewingMaterial.difficulty}</Badge>
                    )}
                  </div>
                </div>

                {viewingMaterial.chapter && (
                  <div>
                    <span className="text-sm text-muted-foreground">Chapter: </span>
                    <span className="text-sm font-medium">{viewingMaterial.chapter}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {viewingMaterial.views} views
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {viewingMaterial.downloads} downloads
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {viewingMaterial.rating}
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Uploaded by:</p>
                  <div className="flex items-center gap-2">
                    <img 
                      src={viewingMaterial.uploadedBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${viewingMaterial.uploadedBy.name}`}
                      alt={viewingMaterial.uploadedBy.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{viewingMaterial.uploadedBy.name}</p>
                      <p className="text-xs text-muted-foreground">{viewingMaterial.uploadedBy.role}</p>
                    </div>
                  </div>
                </div>

                {viewingMaterial.duration && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Duration: </span>
                    <span className="font-medium">{viewingMaterial.duration}</span>
                  </div>
                )}

                {viewingMaterial.pageCount && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Pages: </span>
                    <span className="font-medium">{viewingMaterial.pageCount}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  {viewingMaterial.type === 'video' ? (
                    <Button className="flex-1" onClick={() => { window.open('https://youtube.com', '_blank'); toast.info('Opening video...'); }}>
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  ) : (
                    <Button className="flex-1" onClick={() => { window.open('#', '_blank'); toast.info('Opening in browser...'); }}>
                      <Eye className="w-4 h-4 mr-2" />
                      View in Browser
                    </Button>
                  )}
                  <Button variant="outline" onClick={() => handleDownload(viewingMaterial)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                {viewingMaterial.tags.length > 0 && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-1">
                      {viewingMaterial.tags.map((tag: string, idx: number) => (
                        <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                          #{tag}
                        </span>
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
