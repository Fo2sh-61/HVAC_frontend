import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../services/api';

const ConnectionTest = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus(null);

    try {
      // Test 1: Check if backend is reachable
      console.log('Testing connection to:', api.defaults.baseURL);
      
      const response = await fetch(api.defaults.baseURL.replace('/api', '') + '/swagger/index.html');
      
      if (response.ok) {
        setStatus({
          success: true,
          message: '✅ Backend is running and reachable!',
          details: [
            `Backend URL: ${api.defaults.baseURL}`,
            'Swagger UI is accessible',
            'CORS might still need configuration'
          ]
        });
      } else {
        setStatus({
          success: false,
          message: '❌ Backend responded but with error',
          details: [
            `Status: ${response.status}`,
            `Backend URL: ${api.defaults.baseURL}`,
          ]
        });
      }
    } catch (error) {
      console.error('Connection test error:', error);
      
      setStatus({
        success: false,
        message: '❌ Cannot connect to backend',
        details: [
          `Error: ${error.message}`,
          `Backend URL: ${api.defaults.baseURL}`,
          'Possible issues:',
          '1. Backend is not running',
          '2. Wrong port number',
          '3. CORS not configured',
          '',
          'Check your backend console for the correct port!'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const testLoginEndpoint = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'Test123!');

      await api.post('/Auth/Login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus({
        success: true,
        message: '✅ Login endpoint is working!',
        details: ['API is properly configured']
      });
    } catch (error) {
      if (error.response) {
        setStatus({
          success: true,
          message: '✅ Backend is responding!',
          details: [
            'Login endpoint exists',
            `Response status: ${error.response.status}`,
            error.response.status === 401 ? 'Invalid credentials (expected)' : `Error: ${error.response.data}`,
            'Try registering a user first, then login'
          ]
        });
      } else if (error.code === 'ERR_NETWORK') {
        setStatus({
          success: false,
          message: '❌ Network Error',
          details: [
            'Cannot reach backend',
            'Check if CORS is configured in Program.cs',
            `Backend URL: ${api.defaults.baseURL}`
          ]
        });
      } else {
        setStatus({
          success: false,
          message: '❌ Connection failed',
          details: [
            `Error: ${error.message}`,
            'Backend might not be running'
          ]
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card title="🔌 Backend Connection Test">
          <div className="space-y-4">
            <p className="text-dark-600">
              Use this tool to test your backend connection and diagnose issues.
            </p>

            <div className="flex gap-4">
              <Button 
                variant="primary" 
                onClick={testConnection}
                loading={loading}
              >
                Test Basic Connection
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={testLoginEndpoint}
                loading={loading}
              >
                Test Login Endpoint
              </Button>
            </div>

            {status && (
              <div className={`p-4 rounded-lg ${status.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`font-semibold mb-2 ${status.success ? 'text-green-800' : 'text-red-800'}`}>
                  {status.message}
                </p>
                <div className={`text-sm ${status.success ? 'text-green-700' : 'text-red-700'} space-y-1`}>
                  {status.details.map((detail, index) => (
                    <p key={index} className={detail === '' ? 'mt-2' : ''}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Current Configuration:</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Backend URL:</strong> {api.defaults.baseURL}</p>
                <p><strong>Frontend URL:</strong> {window.location.origin}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">Quick Fixes:</h3>
              <div className="text-sm text-yellow-800 space-y-2">
                <p><strong>1. Check Backend Port:</strong></p>
                <p className="pl-4">Run your backend and look for: "Now listening on: http://localhost:XXXX"</p>
                
                <p><strong>2. Update Frontend:</strong></p>
                <p className="pl-4">Edit src/services/api.js and set baseURL to your backend port</p>
                
                <p><strong>3. Verify CORS:</strong></p>
                <p className="pl-4">Make sure Program.cs has UseCors before UseAuthentication</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionTest;
