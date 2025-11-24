import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Plus, Download, Eye, FileText, Edit } from 'lucide-react';
import { toast } from 'sonner';

const certificateTypes = [
  { id: '1', name: 'Attendance Certificate', icon: '📅', desc: 'For students with good attendance' },
  { id: '2', name: 'Bonafide Certificate', icon: '🎓', desc: 'Proof of enrollment' },
  { id: '3', name: 'Transfer Certificate', icon: '📋', desc: 'When student leaves' },
  { id: '4', name: 'Course Completion', icon: '✅', desc: 'Course completion proof' },
  { id: '5', name: 'Merit Certificate', icon: '🏆', desc: 'For academic excellence' },
  { id: '6', name: 'Character Certificate', icon: '⭐', desc: 'Conduct certificate' },
];

const mockIssuedCertificates = [
  { id: '1', student: 'Rahul Sharma', type: 'Attendance Certificate', issueDate: '2024-11-15', issuedBy: 'Admin', rollNo: '801' },
  { id: '2', student: 'Priya Patel', type: 'Merit Certificate', issueDate: '2024-11-10', issuedBy: 'Principal', rollNo: '902' },
  { id: '3', student: 'Amit Kumar', type: 'Bonafide Certificate', issueDate: '2024-11-05', issuedBy: 'Admin', rollNo: '1003' },
];

export default function Certificates() {
  const [wizardStep, setWizardStep] = useState(1);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Certificate Generator</h1>
            <p className="text-muted-foreground mt-1">Create and manage student certificates</p>
          </div>
        </div>

        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="issued">Issued Log</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-6">
            {/* Certificate Types */}
            <div>
              <h3 className="font-semibold mb-4">Select Certificate Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certificateTypes.map((cert) => (
                  <Card key={cert.id} className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">{cert.icon}</div>
                        <h3 className="font-semibold mb-1">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Generation Wizard */}
            <Card>
              <CardHeader>
                <CardTitle>Certificate Generation Wizard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3, 4, 5, 6].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${wizardStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {step}
                        </div>
                        {step < 6 && <div className={`w-12 h-1 ${wizardStep > step ? 'bg-primary' : 'bg-muted'}`}></div>}
                      </div>
                    ))}
                  </div>

                  {/* Step Content */}
                  {wizardStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step 1: Select Certificate Type</h3>
                      <p className="text-sm text-muted-foreground">Choose the type of certificate you want to generate</p>
                      <div className="grid grid-cols-2 gap-3">
                        {certificateTypes.slice(0, 4).map((cert) => (
                          <Button key={cert.id} variant="outline" className="h-auto p-4 justify-start">
                            <span className="mr-2 text-2xl">{cert.icon}</span>
                            <span>{cert.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step 2: Select Students</h3>
                      <p className="text-sm text-muted-foreground">Search or select students from the list</p>
                      <Input placeholder="Search student by name or admission number..." />
                      <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                        <p className="text-sm text-muted-foreground">Student list will appear here...</p>
                      </div>
                    </div>
                  )}

                  {wizardStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step 3: Enter Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Academic Year</Label>
                          <Input defaultValue="2024-2025" />
                        </div>
                        <div>
                          <Label>Attendance Percentage</Label>
                          <Input type="number" defaultValue="92" />
                        </div>
                        <div>
                          <Label>From Date</Label>
                          <Input type="date" />
                        </div>
                        <div>
                          <Label>To Date</Label>
                          <Input type="date" />
                        </div>
                      </div>
                    </div>
                  )}

                  {wizardStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step 4: Choose Template</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((template) => (
                          <div key={template} className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                            <div className="aspect-[3/4] bg-muted rounded flex items-center justify-center mb-2">
                              <FileText className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-center">Template {template}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {wizardStep === 5 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step 5: Preview</h3>
                      <div className="border rounded-lg p-8 bg-muted/30">
                        <div className="max-w-2xl mx-auto bg-background p-8 border-4 border-primary rounded">
                          <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold">CERTIFICATE</h2>
                            <p className="text-lg">This is to certify that</p>
                            <p className="text-2xl font-bold text-primary">STUDENT NAME</p>
                            <p>has successfully attended</p>
                            <p className="text-xl font-semibold">92% of classes</p>
                            <p>during the academic year 2024-2025</p>
                            <div className="mt-8 flex justify-between items-end">
                              <div>
                                <div className="border-t border-foreground pt-2">Signature</div>
                              </div>
                              <div>
                                <div className="border-t border-foreground pt-2">Principal</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">Edit Details</Button>
                    </div>
                  )}

                  {wizardStep === 6 && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Step 6: Generate & Deliver</h3>
                      <div className="space-y-3">
                        <Button className="w-full" onClick={() => toast.success('Certificate generated!')}>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button className="w-full" variant="outline">
                          Email to Student/Parent
                        </Button>
                        <Button className="w-full" variant="outline">
                          Add to Student Repository
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    {wizardStep > 1 && (
                      <Button variant="outline" onClick={() => setWizardStep(wizardStep - 1)}>
                        Previous
                      </Button>
                    )}
                    {wizardStep < 6 && (
                      <Button className="ml-auto" onClick={() => setWizardStep(wizardStep + 1)}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Certificate Templates</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4].map((template) => (
                    <div key={template} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                        <FileText className="w-16 h-16 text-muted-foreground" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">Template {template}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issued">
            <Card>
              <CardHeader>
                <CardTitle>Issued Certificates Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-3 text-left font-medium">Student</th>
                        <th className="p-3 text-left font-medium">Roll No</th>
                        <th className="p-3 text-left font-medium">Type</th>
                        <th className="p-3 text-left font-medium">Issue Date</th>
                        <th className="p-3 text-left font-medium">Issued By</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockIssuedCertificates.map((cert) => (
                        <tr key={cert.id} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{cert.student}</td>
                          <td className="p-3">{cert.rollNo}</td>
                          <td className="p-3">
                            <Badge variant="outline">{cert.type}</Badge>
                          </td>
                          <td className="p-3">{new Date(cert.issueDate).toLocaleDateString()}</td>
                          <td className="p-3">{cert.issuedBy}</td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
