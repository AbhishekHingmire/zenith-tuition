import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts
const DEMO_ACCOUNTS: Record<string, { password: string; user: User }> = {
  'admin@demo': {
    password: 'admin123',
    user: {
      id: '1',
      username: 'admin@demo',
      email: 'admin@school.com',
      role: 'admin',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
    }
  },
  'teacher@demo': {
    password: 'teacher123',
    user: {
      id: '2',
      username: 'teacher@demo',
      email: 'teacher@school.com',
      role: 'teacher',
      name: 'John Teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher'
    }
  },
  'student@demo': {
    password: 'student123',
    user: {
      id: '4',
      username: 'student@demo',
      email: 'student@school.com',
      role: 'student',
      name: 'Alex Student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Student'
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const account = DEMO_ACCOUNTS[username];
    
    if (account && account.password === password && account.user.role === role) {
      setUser(account.user);
      localStorage.setItem('user', JSON.stringify(account.user));
      
      // Navigate to role-specific dashboard
      switch (role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'student':
          navigate('/student/dashboard');
          break;
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
