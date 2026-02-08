import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (await login(email, password)) navigate('/');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-navy font-inter font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-12 border-gray-200 focus:border-gold focus:ring-gold"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-navy font-inter font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-12 border-gray-200 focus:border-gold focus:ring-gold"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <p className="text-gray-600 font-inter">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-gold hover:text-gold-600 font-medium"
          >
            Sign up here
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;