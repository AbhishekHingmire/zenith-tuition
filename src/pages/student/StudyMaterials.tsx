import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, Video, Download, Eye, Star, Filter, Play } from 'lucide-react';
import { mockStudyMaterials } from '@/data/mockStudentData';
import { toast } from 'sonner';

export default function StudyMaterials() {
  const [materials, setMaterials] = useState(mockStudyMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

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

  const handleDownload = (material: any) => {
    toast.success(`Downloading ${material.title}`);
  };

  const handleView = (material: any) => {
    toast.info(`Opening ${material.title}`);
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'pdf':
      case 'notes':
      case 'reference':
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'video': return 'bg-red-100 text-red-700 border-red-300';
      case 'pdf': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'notes': return 'bg-green-100 text-green-700 border-green-300';
      case 'test': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'reference': return 'bg-amber-100 text-amber-700 border-amber-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-emerald-100 text-emerald-700';
      case 'intermediate': return 'bg-amber-100 text-amber-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Study Materials</h1>
          <p className="text-muted-foreground mt-1">Access notes, videos, and practice materials</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative sm:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search materials..." 
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
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="reference">Reference</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`${getTypeColor(material.type)} p-3 rounded-lg border`}>
                    {getTypeIcon(material.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg line-clamp-2">{material.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{material.subject}</p>
                  </div>
                </div>

                {material.chapter && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Chapter: </span>
                    <span className="font-medium">{material.chapter}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">{material.type.toUpperCase()}</Badge>
                  {material.difficulty && (
                    <Badge className={`${getDifficultyColor(material.difficulty)} text-xs`}>
                      {material.difficulty}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {material.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {material.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {material.rating}
                  </div>
                </div>

                <div className="pt-2 border-t flex items-center gap-2 text-xs text-muted-foreground">
                  <img 
                    src={material.uploadedBy.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${material.uploadedBy.name}`}
                    alt={material.uploadedBy.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{material.uploadedBy.name}</span>
                  <span>•</span>
                  <span>{material.uploadedDate.toLocaleDateString()}</span>
                </div>

                {material.duration && (
                  <div className="text-sm text-muted-foreground">
                    Duration: {material.duration}
                  </div>
                )}

                {material.pageCount && (
                  <div className="text-sm text-muted-foreground">
                    Pages: {material.pageCount}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleView(material)}
                  >
                    {material.type === 'video' ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </>
                    )}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownload(material)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {material.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {material.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No materials found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
