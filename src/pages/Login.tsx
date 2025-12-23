import { useState } from 'react';
import { Eye, EyeOff, User, Lock, GraduationCap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ROLE_COLORS = {
  admin: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  teacher: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  student: 'bg-blue-100 text-blue-700 border-blue-300',
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password, role);
      
      if (!success) {
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials or incorrect role selected.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (demoRole: UserRole) => {
    const credentials = {
      admin: { username: 'admin@demo', password: 'admin123' },
      teacher: { username: 'teacher@demo', password: 'teacher123' },
      student: { username: 'student@demo', password: 'student123' },
    };
    
    setUsername(credentials[demoRole].username);
    setPassword(credentials[demoRole].password);
    setRole(demoRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduManage</h1>
            <p className="text-sm text-gray-600 mt-1">Tuition Management System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email */}
            <div className="space-y-2">
              <Label htmlFor="username">Username / Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {(['admin', 'teacher', 'student'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 rounded-md border-2 font-medium capitalize transition-all ${
                      role === r ? ROLE_COLORS[r] : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Remember me
              </Label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        {/* Demo Accounts Card */}
        <Collapsible open={showDemo} onOpenChange={setShowDemo}>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900">
                <span>Demo Accounts</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${showDemo ? 'rotate-180' : ''}`} />
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4 space-y-2">
              {(['admin', 'teacher', 'student'] as UserRole[]).map((demoRole) => (
                <button
                  key={demoRole}
                  type="button"
                  onClick={() => fillDemoCredentials(demoRole)}
                  className={`w-full text-left p-3 rounded-md border ${ROLE_COLORS[demoRole]} hover:opacity-80 transition-opacity`}
                >
                  <div className="font-medium capitalize mb-1">{demoRole}</div>
                  <div className="text-xs opacity-75">
                    {demoRole}@demo / {demoRole}123
                  </div>
                </button>
              ))}
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>
    </div>
  );
}
