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
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

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
  const [materials, setMaterials] = useState(mockMaterials);
  const [uploadOpen, setUploadOpen] = useState(false);
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

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
    toast.success('Material deleted');
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Materials</p>
              <p className="text-2xl font-bold">{materials.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Views</p>
              <p className="text-2xl font-bold">
                {materials.reduce((sum, m) => sum + m.views, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Downloads</p>
              <p className="text-2xl font-bold">
                {materials.reduce((sum, m) => sum + m.downloads, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
              <p className="text-2xl font-bold">4.7</p>
            </CardContent>
          </Card>
        </div>

        {/* Materials List */}
        <Card>
          <CardHeader>
            <CardTitle>My Uploaded Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`${getTypeColor(material.type)} p-3 rounded-lg`}>
                      {getTypeIcon(material.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span>{material.subject}</span>
                        <span>•</span>
                        <span>{material.chapter}</span>
                        <span>•</span>
                        <span>{material.uploadDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {material.batches.map((batch, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {batch}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {material.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {material.downloads}
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {material.rating}★
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(material.id)}
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
      </div>
    </MainLayout>
  );
}
