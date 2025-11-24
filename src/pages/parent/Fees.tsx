import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  IndianRupee, 
  Download, 
  Share2, 
  AlertCircle,
  CheckCircle,
  Smartphone,
  CreditCard,
  Building2,
  Wallet
} from 'lucide-react';
import { mockFeeInvoices } from '@/data/mockParentData';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ParentFees() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof mockFeeInvoices[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  const paidInvoices = mockFeeInvoices.filter(inv => inv.status === 'paid');
  const pendingInvoices = mockFeeInvoices.filter(inv => inv.status === 'pending' || inv.status === 'overdue');
  
  const totalPaidThisYear = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = pendingInvoices.reduce((sum, inv) => sum + (inv.amount + (inv.lateFee || 0)), 0);

  const nextDueInvoice = pendingInvoices.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())[0];

  const handlePayment = () => {
    toast.success('Payment processing...', {
      description: 'This is a demo. In production, it will redirect to payment gateway.'
    });
    setIsPaymentDialogOpen(false);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const diff = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getDueDateStatus = (dueDate: Date) => {
    const days = getDaysUntilDue(dueDate);
    if (days < 0) return { color: 'text-destructive', label: `Overdue by ${Math.abs(days)} days ❗`, badgeVariant: 'destructive' as const };
    if (days <= 2) return { color: 'text-destructive', label: `Due in ${days} days ⚠️`, badgeVariant: 'destructive' as const };
    if (days <= 7) return { color: 'text-accent', label: `Due in ${days} days ⏰`, badgeVariant: 'default' as const };
    return { color: 'text-secondary', label: `Due in ${days} days`, badgeVariant: 'secondary' as const };
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground mt-1">Manage and pay your child's fees</p>
        </div>

        {/* Fee Status Hero Card */}
        <Card className={`border-2 ${
          totalPending > 0 ? 'border-destructive bg-gradient-to-r from-destructive/10 to-destructive/5' : 
          'border-secondary bg-gradient-to-r from-secondary/10 to-secondary/5'
        }`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${
                  totalPending > 0 ? 'bg-destructive/20' : 'bg-secondary/20'
                }`}>
                  {totalPending > 0 ? (
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-secondary" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className={`text-2xl font-bold ${totalPending > 0 ? 'text-destructive' : 'text-secondary'}`}>
                    {totalPending > 0 ? `₹${totalPending.toLocaleString()} Pending` : 'All Paid ✓'}
                  </p>
                  {nextDueInvoice && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Next: {format(nextDueInvoice.dueDate, 'MMMM d, yyyy')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:ml-auto">
                <div className="text-center p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Paid (This Year)</p>
                  <p className="text-xl font-bold text-secondary">₹{totalPaidThisYear.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold text-destructive">₹{totalPending.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Next Due</p>
                  <p className="text-xl font-bold text-foreground">
                    {nextDueInvoice ? getDaysUntilDue(nextDueInvoice.dueDate) : 0} days
                  </p>
                </div>
              </div>

              {totalPending > 0 && nextDueInvoice && (
                <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="w-full lg:w-auto touch-manipulation min-h-[44px]"
                      onClick={() => setSelectedInvoice(nextDueInvoice)}
                    >
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Pay Fee</DialogTitle>
                      <DialogDescription>Complete payment securely</DialogDescription>
                    </DialogHeader>

                    {selectedInvoice && (
                      <div className="space-y-6">
                        <div className="border rounded-lg p-4 bg-muted/50">
                          <h3 className="font-semibold mb-3">Payment Summary</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Invoice:</span>
                              <span className="font-medium">{selectedInvoice.invoiceNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Period:</span>
                              <span className="font-medium">{selectedInvoice.period}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-medium">₹{selectedInvoice.amount.toLocaleString()}</span>
                            </div>
                            {selectedInvoice.lateFee && (
                              <div className="flex justify-between text-destructive">
                                <span>Late Fee:</span>
                                <span className="font-medium">+₹{selectedInvoice.lateFee.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between pt-2 border-t font-semibold text-base">
                              <span>Total:</span>
                              <span>₹{(selectedInvoice.amount + (selectedInvoice.lateFee || 0)).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="font-semibold">Payment Method</h3>
                          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3 border rounded-lg p-4">
                                <RadioGroupItem value="upi" id="upi" />
                                <Label htmlFor="upi" className="flex items-center gap-3 cursor-pointer flex-1">
                                  <Smartphone className="w-5 h-5" />
                                  <div>
                                    <p className="font-medium">UPI</p>
                                    <p className="text-xs text-muted-foreground">GPay, PhonePe</p>
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-3 border rounded-lg p-4">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                                  <CreditCard className="w-5 h-5" />
                                  <div>
                                    <p className="font-medium">Card</p>
                                    <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-3 border rounded-lg p-4">
                                <RadioGroupItem value="netbanking" id="netbanking" />
                                <Label htmlFor="netbanking" className="flex items-center gap-3 cursor-pointer flex-1">
                                  <Building2 className="w-5 h-5" />
                                  <div>
                                    <p className="font-medium">Net Banking</p>
                                  </div>
                                </Label>
                              </div>

                              <div className="flex items-center space-x-3 border rounded-lg p-4">
                                <RadioGroupItem value="wallet" id="wallet" />
                                <Label htmlFor="wallet" className="flex items-center gap-3 cursor-pointer flex-1">
                                  <Wallet className="w-5 h-5" />
                                  <div>
                                    <p className="font-medium">Wallets</p>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          </RadioGroup>

                          {paymentMethod === 'upi' && (
                            <Input placeholder="Enter UPI ID" />
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-4 h-4" />
                          <span>🔒 256-bit Secure • PCI DSS Certified</span>
                        </div>
                      </div>
                    )}

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handlePayment}>
                        Pay ₹{selectedInvoice && (selectedInvoice.amount + (selectedInvoice.lateFee || 0)).toLocaleString()}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pending">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              Pending
              {pendingInvoices.length > 0 && (
                <Badge variant="destructive" className="ml-2">{pendingInvoices.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 mt-4">
            {pendingInvoices.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All Paid!</h3>
                  <p className="text-muted-foreground">No pending payments</p>
                </CardContent>
              </Card>
            ) : (
              pendingInvoices.map((invoice) => {
                const dueStatus = getDueDateStatus(invoice.dueDate);

                return (
                  <Card key={invoice.id} className="border-2 border-destructive">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <h3 className="text-lg font-semibold">{invoice.period}</h3>
                          <p className="text-sm text-muted-foreground">
                            Invoice: {invoice.invoiceNumber} • Due: {format(invoice.dueDate, 'MMM d, yyyy')}
                          </p>
                          <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${dueStatus.color}`}>
                            {dueStatus.label}
                          </div>
                          <div className="space-y-1 pt-3 border-t">
                            <div className="flex justify-between">
                              <span>Amount:</span>
                              <span className="font-semibold">₹{invoice.amount.toLocaleString()}</span>
                            </div>
                            {invoice.lateFee && (
                              <div className="flex justify-between text-destructive">
                                <span>Late Fee:</span>
                                <span className="font-semibold">+₹{invoice.lateFee.toLocaleString()}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-lg font-bold pt-2 border-t">
                              <span>Total:</span>
                              <span>₹{(invoice.amount + (invoice.lateFee || 0)).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className="w-full lg:w-auto"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setIsPaymentDialogOpen(true);
                          }}
                        >
                          <IndianRupee className="w-5 h-5 mr-2" />
                          Pay Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="paid" className="space-y-4 mt-4">
            {paidInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-secondary" />
                        <div>
                          <h3 className="text-lg font-semibold">{invoice.period}</h3>
                          <p className="text-sm text-muted-foreground">
                            Invoice: {invoice.invoiceNumber}
                          </p>
                        </div>
                        <Badge className="bg-secondary">Paid</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Paid On:</span>
                          <p className="font-medium">{invoice.paymentDate && format(invoice.paymentDate, 'MMM d, yyyy')}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <p className="font-semibold text-secondary">₹{invoice.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
