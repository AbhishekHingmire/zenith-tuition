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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Award, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

const mockIncidents = [
  {
    id: '1',
    student: { name: 'Rahul Kumar', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul' },
    type: 'Late',
    severity: 'minor',
    date: new Date('2024-01-20'),
    description: 'Arrived 15 minutes late to class',
    action: 'Warning given',
  },
  {
    id: '2',
    student: { name: 'Priya Sharma', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya' },
    type: 'Disruptive',
    severity: 'moderate',
    date: new Date('2024-01-19'),
    description: 'Talking during lecture',
    action: 'Parent informed',
  },
];

const mockRecognitions = [
  {
    id: '1',
    student: { name: 'Amit Patel', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit' },
    reason: 'Excellent work',
    points: 50,
    date: new Date('2024-01-21'),
  },
];

export default function Behavior() {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [recognitions, setRecognitions] = useState(mockRecognitions);
  const [incidentOpen, setIncidentOpen] = useState(false);
  const [recognitionOpen, setRecognitionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [incidentForm, setIncidentForm] = useState({
    studentName: '',
    type: '',
    severity: '',
    description: '',
    action: '',
    followUp: 'no',
  });

  const [recognitionForm, setRecognitionForm] = useState({
    studentName: '',
    reason: '',
    points: '',
  });

  const handleSubmitIncident = () => {
    const newIncident = {
      id: String(incidents.length + 1),
      student: { name: incidentForm.studentName, photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${incidentForm.studentName}` },
      type: incidentForm.type,
      severity: incidentForm.severity,
      date: new Date(),
      description: incidentForm.description,
      action: incidentForm.action,
    };
    setIncidents([newIncident, ...incidents]);
    setIncidentOpen(false);
    setIncidentForm({
      studentName: '',
      type: '',
      severity: '',
      description: '',
      action: '',
      followUp: 'no',
    });
    toast.success('Incident reported successfully');
  };

  const handleSubmitRecognition = () => {
    const newRecognition = {
      id: String(recognitions.length + 1),
      student: { name: recognitionForm.studentName, photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${recognitionForm.studentName}` },
      reason: recognitionForm.reason,
      points: Number(recognitionForm.points),
      date: new Date(),
    };
    setRecognitions([newRecognition, ...recognitions]);
    setRecognitionOpen(false);
    setRecognitionForm({
      studentName: '',
      reason: '',
      points: '',
    });
    toast.success(`${recognitionForm.points} points awarded to ${recognitionForm.studentName}!`);
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'minor': return 'bg-amber-100 text-amber-700';
      case 'moderate': return 'bg-orange-100 text-orange-700';
      case 'serious': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Behavior Management</h1>
          <p className="text-muted-foreground mt-1">Track incidents and recognize positive behavior</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Incidents</p>
                  <p className="text-2xl font-bold">{incidents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recognitions</p>
                  <p className="text-2xl font-bold">{recognitions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Points Awarded</p>
              <p className="text-2xl font-bold text-secondary">
                {recognitions.reduce((sum, r) => sum + r.points, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Students Tracked</p>
              <p className="text-2xl font-bold">
                {new Set([...incidents.map(i => i.student.name), ...recognitions.map(r => r.student.name)]).size}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => setIncidentOpen(true)} variant="outline" className="flex-1">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Report Incident
          </Button>
          <Button onClick={() => setRecognitionOpen(true)} className="bg-secondary hover:bg-secondary/90 flex-1">
            <Award className="w-4 h-4 mr-2" />
            Award Points
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="incidents" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="recognitions">Recognitions</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle>Incident Reports</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <img 
                        src={incident.student.photo}
                        alt={incident.student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{incident.student.name}</h3>
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                          <Badge variant="outline">{incident.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{incident.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{incident.date.toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Action: {incident.action}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recognitions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Positive Recognitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recognitions.map((recognition) => (
                    <div
                      key={recognition.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-secondary/20 bg-secondary/5 rounded-lg"
                    >
                      <img 
                        src={recognition.student.photo}
                        alt={recognition.student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{recognition.student.name}</h3>
                          <Badge className="bg-secondary text-secondary-foreground">
                            +{recognition.points} XP
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{recognition.reason}</p>
                        <p className="text-xs text-muted-foreground">{recognition.date.toLocaleDateString()}</p>
                      </div>
                      <Award className="w-8 h-8 text-amber-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Report Incident Dialog */}
        <Dialog open={incidentOpen} onOpenChange={setIncidentOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Report Incident</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  placeholder="Search and select student"
                  value={incidentForm.studentName}
                  onChange={(e) => setIncidentForm({ ...incidentForm, studentName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Incident Type *</Label>
                  <Select value={incidentForm.type} onValueChange={(value) => setIncidentForm({ ...incidentForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Late">Late</SelectItem>
                      <SelectItem value="Disruptive">Disruptive</SelectItem>
                      <SelectItem value="Absent without notice">Absent without notice</SelectItem>
                      <SelectItem value="Misbehavior">Misbehavior</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity *</Label>
                  <Select value={incidentForm.severity} onValueChange={(value) => setIncidentForm({ ...incidentForm, severity: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="serious">Serious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the incident..."
                  value={incidentForm.description}
                  onChange={(e) => setIncidentForm({ ...incidentForm, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="action">Action Taken *</Label>
                <Select value={incidentForm.action} onValueChange={(value) => setIncidentForm({ ...incidentForm, action: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Warning given">Warning given</SelectItem>
                    <SelectItem value="Parent informed">Parent informed</SelectItem>
                    <SelectItem value="Detention">Detention</SelectItem>
                    <SelectItem value="Meeting scheduled">Meeting scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="followUp">Follow-up Required?</Label>
                <Select value={incidentForm.followUp} onValueChange={(value) => setIncidentForm({ ...incidentForm, followUp: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIncidentOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitIncident} className="bg-primary hover:bg-primary/90">
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Award Points Dialog */}
        <Dialog open={recognitionOpen} onOpenChange={setRecognitionOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Award Recognition Points</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recStudentName">Student Name *</Label>
                <Input
                  id="recStudentName"
                  placeholder="Search and select student"
                  value={recognitionForm.studentName}
                  onChange={(e) => setRecognitionForm({ ...recognitionForm, studentName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Recognition *</Label>
                <Select value={recognitionForm.reason} onValueChange={(value) => setRecognitionForm({ ...recognitionForm, reason: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent work">Excellent work</SelectItem>
                    <SelectItem value="Helping others">Helping others</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Improvement">Improvement</SelectItem>
                    <SelectItem value="Participation">Active Participation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="points">Points to Award *</Label>
                <Input
                  id="points"
                  type="number"
                  placeholder="e.g., 50"
                  value={recognitionForm.points}
                  onChange={(e) => setRecognitionForm({ ...recognitionForm, points: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRecognitionOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitRecognition} className="bg-secondary hover:bg-secondary/90">
                <Award className="w-4 h-4 mr-2" />
                Award Points
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
