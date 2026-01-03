import React from 'react';
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />
      
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-10"
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="z-10">
        {children}
      </div>
    </div>
  );
};

export const SignInPage = () => (
  <AuthLayout>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </AuthLayout>
);

export const SignUpPage = () => (
  <AuthLayout>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </AuthLayout>
);