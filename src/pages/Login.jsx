import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    setLoading(false);
    
    if (!result.success) {
      setError(result.error);
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4">
              <span className="text-white font-bold text-3xl">H</span>
            </div>
            <h1 className="text-3xl font-bold text-dark-800 mb-2 font-display">
              {t('loginTitle')}
            </h1>
            <p className="text-dark-500">
              {t('welcome')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label={t('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />

            <Input
              label={t('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              icon={<ArrowRight size={20} />}
            >
              {t('login')}
            </Button>

            <p className="text-center text-sm text-dark-600">
              {t('dontHaveAccount')}{' '}
              <Link 
                to="/register" 
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                {t('register')}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold mb-4 font-display">
              Professional HVAC Management
            </h2>
            <p className="text-lg opacity-90">
              Streamline your service operations with our comprehensive management system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
