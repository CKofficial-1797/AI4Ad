import { useEffect, useState } from 'react';
import AuthLayout from '@/components/AuthLayout';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterationForm';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout
      title={isLogin ? "Welcome Back" : "Create Account"}
      subtitle={isLogin ? "Sign in to your Adious AI account" : "Join Adious AI today"}
    >
      {isLogin ? (
        <LoginForm
          onSwitchToRegister={() => setIsLogin(false)}
        />
      ) : (
        <RegisterForm
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </AuthLayout>
  );
};

export default Index;
