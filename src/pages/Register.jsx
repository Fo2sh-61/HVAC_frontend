import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, UserCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    role: 'Customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(formData);
    
    setLoading(false);
    
    if (result.success) {
      alert('Registration successful! Please login.');
      navigate('/login');
    } else {
      setError(result.error);
      console.error('Registration failed:', result.error);
    }
  };

  const roleOptions = [
    { value: 'Customer', label: t('customer') },
    { value: 'Engineer', label: t('engineer') },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-4">
              <span className="text-white font-bold text-3xl">H</span>
            </div>
            <h1 className="text-3xl font-bold text-dark-800 mb-2 font-display">
              {t('registerTitle')}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label={t('fullName')}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <Input
                label={t('username')}
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="johndoe"
                required
              />

              <Input
                label={t('email')}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />

              <Input
                label={t('password')}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <Input
                label={t('phoneNumber')}
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+20 123 456 7890"
                required
              />

              <Select
                label={t('role')}
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                required
              />
            </div>

            <Input
              label={t('address')}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, Cairo, Egypt"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
              icon={<ArrowRight size={20} />}
            >
              {t('register')}
            </Button>

            <p className="text-center text-sm text-dark-600">
              {t('alreadyHaveAccount')}{' '}
              <Link 
                to="/login" 
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                {t('login')}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold mb-4 font-display">
              Join Our Platform
            </h2>
            <p className="text-lg opacity-90">
              Start managing your HVAC services efficiently today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
