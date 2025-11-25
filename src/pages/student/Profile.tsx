import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { User, Phone, Mail, Calendar, MapPin, Upload, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { mockStudents } from '@/data/mockData';

export default function StudentProfile() {
  const student = mockStudents[0];
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState('rahul.kumar@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('123, MG Road, Bangalore, Karnataka - 560001');
  
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOTP = () => {
    if (!newPhone || newPhone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    setIsVerifying(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsVerifying(false);
      toast.success('OTP sent to your mobile number');
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsVerifying(false);
      if (otp === '123456') { // Mock verification
        setPhone(newPhone);
        setShowOTPDialog(false);
        setOtpSent(false);
        setOtp('');
        setNewPhone('');
        toast.success('Mobile number updated successfully!');
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    }, 1500);
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleChangePhone = () => {
    setShowOTPDialog(true);
    setOtpSent(false);
    setOtp('');
    setNewPhone('');
  };

  return (
    <MainLayout>
      <div className="space-y-6 pb-20 md:pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your personal information</p>
        </div>

        {/* Profile Picture Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={student.photo} />
                <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-foreground">{student.name}</h3>
                <p className="text-sm text-muted-foreground">Student ID: {student.id}</p>
                <p className="text-sm text-muted-foreground">Batch: {student.batch}</p>
                <Button variant="outline" size="sm" className="mt-3">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="dob" 
                    value="15/08/2005" 
                    disabled 
                    className="pl-10 bg-muted/50"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Contact admin to change</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      value={phone} 
                      disabled 
                      className="pl-10 bg-muted/50"
                    />
                  </div>
                  <Button variant="outline" onClick={handleChangePhone}>
                    <Shield className="w-4 h-4 mr-2" />
                    Change
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">OTP verification required</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button onClick={handleUpdateProfile} className="w-full sm:w-auto">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Student ID</span>
                <span className="font-medium">{student.id}</span>
              </div>
              <div className="flex justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Batch</span>
                <span className="font-medium">{student.batch}</span>
              </div>
              <div className="flex justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Admission Date</span>
                <span className="font-medium">01/04/2023</span>
              </div>
              <div className="flex justify-between p-3 border border-border rounded-lg">
                <span className="text-sm text-muted-foreground">Enrollment Status</span>
                <span className="font-medium text-green-500">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* OTP Verification Dialog */}
      <Dialog open={showOTPDialog} onOpenChange={setShowOTPDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Change Mobile Number
            </DialogTitle>
            <DialogDescription>
              Enter your new mobile number and verify with OTP
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-phone">New Mobile Number</Label>
              <div className="flex gap-2">
                <Input
                  id="new-phone"
                  placeholder="+91 98765 43210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  disabled={otpSent}
                  className="flex-1"
                />
                {!otpSent && (
                  <Button 
                    onClick={handleSendOTP}
                    disabled={isVerifying}
                  >
                    {isVerifying ? 'Sending...' : 'Send OTP'}
                  </Button>
                )}
              </div>
            </div>

            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  OTP sent to {newPhone}. For demo, use: 123456
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowOTPDialog(false);
                setOtpSent(false);
                setOtp('');
                setNewPhone('');
              }}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            {otpSent && (
              <Button 
                onClick={handleVerifyOTP}
                disabled={isVerifying}
                className="w-full sm:w-auto"
              >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
