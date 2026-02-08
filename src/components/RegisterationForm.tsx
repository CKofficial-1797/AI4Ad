import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!(formData.password.length >= 8)) {
      toast({
        title: "Registration Failed",
        description: "Password must be atleast 8 character long.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Registration Failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }


    if (await register(formData.name, formData.email, formData.password)) navigate('/');

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-navy font-inter font-medium">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 h-12 border-gray-200 focus:border-gold focus:ring-gold"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-navy font-inter font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
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
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 h-12 border-gray-200 focus:border-gold focus:ring-gold"
            placeholder="Create a password"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-navy font-inter font-medium">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 h-12 border-gray-200 focus:border-gold focus:ring-gold"
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-gold hover:bg-gold-600 text-navy font-outfit font-medium uppercase tracking-wide"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <div className="text-center">
        <p className="text-gray-600 font-inter">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-gold hover:text-gold-600 font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;