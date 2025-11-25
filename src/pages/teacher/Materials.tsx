import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  X
} from 'lucide-react';
import { toast } from 'sonner';

type Material = {
  id: string;
  title: string;
  subject: string;
  batches: string[];
  chapter: string;
  type: string;
  uploadDate: Date;
  views: number;
  downloads: number;
  rating: number;
  description?: string;
  tags?: string;
  difficulty?: string;
  externalLink?: string;
};

const mockMaterials = [
  {
    id: '1',
    title: 'Quadratic Equations - Complete Notes',
    subject: 'Mathematics',
    batches: ['Grade 10-A', 'Grade 10-B'],
    chapter: 'Chapter 4',
    type: 'pdf',
    uploadDate: new Date('2024-01-15'),
    views: 145,
    downloads: 87,
    rating: 4.5,
  },
  {
    id: '2',
    title: 'Newton\'s Laws of Motion Video',
    subject: 'Physics',
    batches: ['Grade 11-A'],
    chapter: 'Chapter 5',
    type: 'video',
    uploadDate: new Date('2024-01-20'),
    views: 98,
    downloads: 45,
    rating: 4.8,
  },
];

export default function Materials() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  
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
      rating: 0,
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
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Study Materials</h1>
            <p className="text-muted-foreground mt-1">Upload and manage learning resources</p>
          </div>
          <Button onClick={() => setUploadOpen(true)} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Upload Material
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-0.5">Total Materials</p>
              <p className="text-xl font-bold">{materials.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-0.5">Total Views</p>
              <p className="text-xl font-bold">
                {materials.reduce((sum, m) => sum + m.views, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-0.5">Downloads</p>
              <p className="text-xl font-bold">
                {materials.reduce((sum, m) => sum + m.downloads, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-0.5">Avg. Rating</p>
              <p className="text-xl font-bold">4.7</p>
            </CardContent>
          </Card>
        </div>

        {/* Materials List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">My Uploaded Materials</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`${getTypeColor(material.type)} p-2 rounded-lg flex-shrink-0`}>
                      {getTypeIcon(material.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">{material.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-1">
                        <span>{material.subject}</span>
                        <span>•</span>
                        <span>{material.chapter}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{material.uploadDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {material.batches.slice(0, 2).map((batch, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs px-1.5 py-0">
                            {batch}
                          </Badge>
                        ))}
                        {material.batches.length > 2 && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0">
                            +{material.batches.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{material.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <span>{material.downloads}</span>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleView(material)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEditClick(material)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteClick(material)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                    <p className="font-medium">{selectedMaterial.uploadDate.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
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
                  <div className="text-center p-3 border rounded-lg">
                    <BarChart3 className="w-5 h-5 mx-auto mb-1 text-accent" />
                    <p className="text-2xl font-bold">{selectedMaterial.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
