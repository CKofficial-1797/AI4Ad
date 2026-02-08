import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gold rounded-xl mb-6">
            <span className="text-navy font-bold text-2xl font-outfit">A</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-inter">{title}</h1>
          <p className="text-gray-300 font-inter">{subtitle}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm font-inter">
            © 2025 Adious AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;