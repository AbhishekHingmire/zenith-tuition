import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTablePagination } from '@/components/ui/data-table-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  Upload, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Eye, 
  Download, 
  Edit, 
  Trash2,
  Plus,
  BarChart3,
  X,
  TrendingUp,
  FolderOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { yearlyMaterials } from '@/data/yearlyMockData';
import { useAuth } from '@/contexts/AuthContext';
import { coachingBatches } from '@/data/comprehensiveCoachingData';

type Material = {
  id: string;
  title: string;
  subject: string;
  batches: string[];
  batchIds: string[];
  chapter: string;
  type: string;
  uploadDate: string;
  uploadedBy: string;
  views: number;
  downloads: number;
  description?: string;
  tags?: string;
  difficulty?: string;
  externalLink?: string;
};

export default function Materials() {
  const { user } = useAuth();
  const role = user?.role || 'teacher';
  
  // Get current month as default filter
  const currentMonth = new Date().getMonth() + 1;
  
  const [selectedMonth, setSelectedMonth] = useState<string>('current');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  
  // Filter materials based on role and selections
  const filteredMaterials = useMemo(() => {
    let filtered = [...yearlyMaterials];
    
    // Role-based filtering
    if (role === 'teacher') {
      filtered = filtered.filter(mat => mat.uploadedBy === user?.name);
    } else if (role === 'student') {
      const studentBatches = (user as any)?.batches || [];
      filtered = filtered.filter(mat => 
        mat.batches.some(b => studentBatches.includes(b))
      );
    }
    
    // Month filter
    if (selectedMonth !== 'all') {
      const targetMonth = selectedMonth === 'current' ? currentMonth : parseInt(selectedMonth);
      filtered = filtered.filter(mat => {
        const matMonth = parseInt(mat.uploadDate.split('-')[1]);
        return matMonth === targetMonth;
      });
    }
    
    // Subject filter
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(mat => mat.subject === selectedSubject);
    }
    
    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(mat => mat.type === selectedType);
    }
    
    return filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }, [role, user, selectedMonth, selectedSubject, selectedType]);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, endIndex);
  
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = filteredMaterials.length;
    const totalViews = filteredMaterials.reduce((sum, m) => sum + m.views, 0);
    const totalDownloads = filteredMaterials.reduce((sum, m) => sum + m.downloads, 0);
    const thisMonth = filteredMaterials.filter(m => {
      const matMonth = parseInt(m.uploadDate.split('-')[1]);
      return matMonth === currentMonth;
    }).length;
    
    return { total, totalViews, totalDownloads, thisMonth };
  }, [filteredMaterials, currentMonth]);
  
  // Get unique subjects from yearlyMaterials
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(yearlyMaterials.map(m => m.subject))];
    return uniqueSubjects.sort();
  }, []);
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    chapter: '',
    type: '',
    description: '',
    tags: '',
    difficulty: '',
    externalLink: '',
  });

  const batches = ['Grade 10-A', 'Grade 10-B', 'Grade 11-A', 'Grade 11-B', 'Grade 12-A'];

  const toggleBatch = (batch: string) => {
    setSelectedBatches(prev =>
      prev.includes(batch) ? prev.filter(b => b !== batch) : [...prev, batch]
    );
  };

  const handleUpload = () => {
    const newMaterial = {
      id: String(materials.length + 1),
      title: formData.title,
      subject: formData.subject,
      batches: selectedBatches,
      chapter: formData.chapter,
      type: formData.type,
      uploadDate: new Date(),
      views: 0,
      downloads: 0,
      // rating: 0,
    };
    setMaterials([newMaterial, ...materials]);
    setUploadOpen(false);
    setFormData({
      title: '',
      subject: '',
      chapter: '',
      type: '',
      description: '',
      tags: '',
      difficulty: '',
      externalLink: '',
    });
    setSelectedBatches([]);
    toast.success('Material uploaded successfully!');
  };

  const handleView = (material: Material) => {
    setSelectedMaterial(material);
    setViewOpen(true);
  };

  const handleEditClick = (material: Material) => {
    setSelectedMaterial(material);
    setFormData({
      title: material.title,
      subject: material.subject,
      chapter: material.chapter,
      type: material.type,
      description: material.description || '',
      tags: material.tags || '',
      difficulty: material.difficulty || '',
      externalLink: material.externalLink || '',
    });
    setSelectedBatches(material.batches);
    setEditOpen(true);
  };

  const handleEditSave = () => {
    if (!selectedMaterial) return;
    
    const updatedMaterials = materials.map(m =>
      m.id === selectedMaterial.id
        ? {
            ...m,
            title: formData.title,
            subject: formData.subject,
            chapter: formData.chapter,
            type: formData.type,
            batches: selectedBatches,
            description: formData.description,
            tags: formData.tags,
            difficulty: formData.difficulty,
            externalLink: formData.externalLink,
          }
        : m
    );
    setMaterials(updatedMaterials);
    setEditOpen(false);
    setFormData({
      title: '',
      subject: '',
      chapter: '',
      type: '',
      description: '',
      tags: '',
      difficulty: '',
      externalLink: '',
    });
    setSelectedBatches([]);
    toast.success('Material updated successfully!');
  };

  const handleDeleteClick = (material: Material) => {
    setSelectedMaterial(material);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedMaterial) return;
    setMaterials(materials.filter(m => m.id !== selectedMaterial.id));
    setDeleteOpen(false);
    setSelectedMaterial(null);
    toast.success('Material deleted successfully!');
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-5 h-5 text-red-600" />;
      case 'pdf': return <FileText className="w-5 h-5 text-blue-600" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'pdf': return 'bg-blue-100 text-blue-700';
      case 'notes': return 'bg-green-100 text-green-700';
      case 'test': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Study Materials</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Upload and manage learning resources</p>
          </div>
          <Button onClick={() => setUploadOpen(true)} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Upload Material
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Materials</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                </div>
                <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Views</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalViews}</p>
                </div>
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Downloads</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalDownloads}</p>
                </div>
                <Download className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">This Month</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.thisMonth}</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-medium mb-1.5 block">Month</label>
                <Select value={selectedMonth} onValueChange={(value) => { setSelectedMonth(value); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="current">This Month</SelectItem>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-medium mb-1.5 block">Subject</label>
                <Select value={selectedSubject} onValueChange={(value) => { setSelectedSubject(value); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-xs sm:text-sm font-medium mb-1.5 block">Type</label>
                <Select value={selectedType} onValueChange={(value) => { setSelectedType(value); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="ppt">PPT</SelectItem>
                    <SelectItem value="doc">Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(selectedMonth !== 'current' || selectedSubject !== 'all' || selectedType !== 'all') && (
                <Button
                  variant="outline"
                  size="sm"
                  className="sm:mt-6"
                  onClick={() => {
                    setSelectedMonth('current');
                    setSelectedSubject('all');
                    setSelectedType('all');
                    setCurrentPage(1);
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Materials List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {paginatedMaterials.map((material) => (
            <Card
              key={material.id}
              className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer group"
              onClick={() => handleView(material)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col h-full">
                  {/* Icon and Type */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${getTypeColor(material.type)} p-2 rounded-lg`}>
                      {getTypeIcon(material.type)}
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {material.type}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {material.title}
                  </h3>

                  {/* Subject & Chapter */}
                  <div className="space-y-1 mb-3 text-xs text-muted-foreground">
                    <p className="truncate">{material.subject}</p>
                    <p className="truncate">{material.chapter}</p>
                  </div>

                  {/* Batches */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {material.batches.slice(0, 1).map((batch, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0">
                        {batch.length > 10 ? batch.substring(0, 10) + '...' : batch}
                      </Badge>
                    ))}
                    {material.batches.length > 1 && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        +{material.batches.length - 1}
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{material.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{material.downloads}</span>
                    </div>
                  </div>

                  {/* Upload Date */}
                  <p className="text-xs text-muted-foreground mb-3">
                    {format(new Date(material.uploadDate), 'PP')}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-1 mt-auto pt-2 border-t">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="flex-1 h-7 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(material);
                      }}
                    >
                      <Eye className="w-3 h-3 sm:mr-1" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(material);
                      }}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(material);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {filteredMaterials.length > 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <DataTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredMaterials.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredMaterials.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No materials found</h3>
              <p className="text-muted-foreground mb-6">
                {selectedMonth !== 'current' || selectedSubject !== 'all' || selectedType !== 'all'
                  ? 'Try adjusting your filters to see more materials'
                  : 'Upload your first study material to get started'}
              </p>
              {selectedMonth === 'current' && selectedSubject === 'all' && selectedType === 'all' && (
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setUploadOpen(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Upload Material
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Upload Dialog */}
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Upload Study Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Material Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Quadratic Equations - Practice Problems"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapter">Chapter/Topic *</Label>
                  <Input
                    id="chapter"
                    placeholder="e.g., Chapter 4"
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Batches * (multi-select)</Label>
                <div className="grid grid-cols-2 gap-3 p-4 border rounded-md">
                  {batches.map((batch) => (
                    <div key={batch} className="flex items-center space-x-2">
                      <Checkbox
                        id={batch}
                        checked={selectedBatches.includes(batch)}
                        onCheckedChange={() => toggleBatch(batch)}
                      />
                      <label
                        htmlFor={batch}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {batch}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Material Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Notes</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="test">Practice Test</SelectItem>
                      <SelectItem value="notes">Reference Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, PPT, or Video (max 50MB)
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="externalLink">Or External Link (YouTube, Google Drive)</Label>
                <Input
                  id="externalLink"
                  placeholder="https://..."
                  value={formData.externalLink}
                  onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the material..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., algebra, equations, practice"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload} className="bg-primary hover:bg-primary/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Material
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Material Details</DialogTitle>
            </DialogHeader>
            {selectedMaterial && (
              <div className="space-y-4 py-4">
                <div className="flex items-start gap-4">
                  <div className={`${getTypeColor(selectedMaterial.type)} p-3 rounded-lg`}>
                    {getTypeIcon(selectedMaterial.type)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{selectedMaterial.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedMaterial.batches.map((batch, idx) => (
                        <Badge key={idx} variant="outline">{batch}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedMaterial.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Chapter</p>
                    <p className="font-medium">{selectedMaterial.chapter}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{selectedMaterial.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Upload Date</p>
                    <p className="font-medium">{format(new Date(selectedMaterial.uploadDate), 'PP')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <Eye className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-2xl font-bold">{selectedMaterial.views}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <Download className="w-5 h-5 mx-auto mb-1 text-secondary" />
                    <p className="text-2xl font-bold">{selectedMaterial.downloads}</p>
                    <p className="text-xs text-muted-foreground">Downloads</p>
                  </div>
                  {/* <div className="text-center p-3 border rounded-lg">
                    <BarChart3 className="w-5 h-5 mx-auto mb-1 text-accent" />
                    <p className="text-2xl font-bold">{selectedMaterial.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p> 
                  </div> */}
                </div>

                {selectedMaterial.description && (
                  <div>
                    <Label className="text-sm font-semibold">Description</Label>
                    <p className="text-sm text-muted-foreground mt-1">{selectedMaterial.description}</p>
                  </div>
                )}

                {selectedMaterial.tags && (
                  <div>
                    <Label className="text-sm font-semibold">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedMaterial.tags.split(',').map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag.trim()}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedMaterial.externalLink && (
                  <div>
                    <Label className="text-sm font-semibold">External Link</Label>
                    <a
                      href={selectedMaterial.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-1 flex items-center gap-1"
                    >
                      <LinkIcon className="w-3 h-3" />
                      {selectedMaterial.externalLink}
                    </a>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setViewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>Edit Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Material Title *</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-chapter">Chapter/Topic *</Label>
                  <Input
                    id="edit-chapter"
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Batches *</Label>
                <div className="grid grid-cols-2 gap-3 p-4 border rounded-md">
                  {batches.map((batch) => (
                    <div key={batch} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${batch}`}
                        checked={selectedBatches.includes(batch)}
                        onCheckedChange={() => toggleBatch(batch)}
                      />
                      <label htmlFor={`edit-${batch}`} className="text-sm cursor-pointer">
                        {batch}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-type">Material Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Notes</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="test">Practice Test</SelectItem>
                    <SelectItem value="notes">Reference Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Material</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{selectedMaterial?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}
