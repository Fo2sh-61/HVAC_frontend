import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/Auth/CurrentUser');
        setUser(response.data);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      console.log('Attempting login to:', api.defaults.baseURL + '/Auth/Login');
      
      const response = await api.post('/Auth/Login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Login response:', response.data);
      
      const { token } = response.data;
      
      if (!token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', token);
      
      // Get user info
      const userResponse = await api.get('/Auth/CurrentUser');
      setUser(userResponse.data);
      
      // Navigate based on role
      const role = userResponse.data.roles[0].toLowerCase();
      navigate(`/${role}`);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = 'Cannot connect to server. Please check if backend is running on the correct port.';
      } else if (error.response) {
        // Server responded with error
        errorMessage = error.response.data?.message || error.response.data || 'Invalid email or password';
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Server not responding. Please check your backend connection.';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration to:', api.defaults.baseURL + '/Auth/Register');
      console.log('User data:', userData);
      
      const response = await api.post('/Auth/Register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Registration response:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = 'Cannot connect to server. Please check if backend is running.';
      } else if (error.response) {
        // Server responded with error
        if (error.response.data?.errors) {
          // Validation errors from backend
          const errors = Object.values(error.response.data.errors).flat();
          errorMessage = errors.join(', ');
        } else {
          errorMessage = error.response.data?.message || error.response.data || 'Registration failed';
        }
      } else if (error.request) {
        errorMessage = 'Server not responding. Please check your backend connection.';
      }
      
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.roles?.includes('Admin'),
    isCustomer: user?.roles?.includes('Customer'),
    isEngineer: user?.roles?.includes('Engineer'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
