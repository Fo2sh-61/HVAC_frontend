import React, { useState, useEffect } from 'react';
import { Wrench, FileText, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import Card from '../../components/Card';
import Loading from '../../components/Loading';
import { StatusBadge } from '../../components/Badge';
import { serviceService, serviceRequestService } from '../../services/serviceApi';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    totalRequests: 0,
    totalEngineers: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesData, requestsData] = await Promise.all([
        serviceService.getAll(),
        serviceRequestService.getAll('Admin'),
      ]);

      setStats({
        totalServices: servicesData.length,
        totalRequests: requestsData.length,
        totalEngineers: 0, // Will be implemented when engineers endpoint is added
      });

      setRecentRequests(requestsData.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: t('totalServices'),
      value: stats.totalServices,
      icon: Wrench,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: t('totalRequests'),
      value: stats.totalRequests,
      icon: FileText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: t('totalEngineers'),
      value: stats.totalEngineers,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  if (loading) return <DashboardLayout><Loading /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2 font-display">
            {t('welcome')} 👋
          </h1>
          <p className="text-primary-100">
            {t('dashboard')} - Admin Panel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <Card 
              key={index} 
              className="animate-slide-up" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-500 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-dark-800">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-16 h-16 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={stat.textColor} size={32} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Requests */}
        <Card title={t('recentRequests')}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">
                    {t('serviceName')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">
                    {t('status')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">
                    {t('estimatedPrice')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {request.id.slice(0, 8)}...
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-800 font-medium">
                      Service #{request.serviceId.slice(0, 8)}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-dark-800">
                      ${request.estimatedPrice}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600">
                      {request.createdAt ? format(new Date(request.createdAt), 'MMM dd, yyyy') : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentRequests.length === 0 && (
              <div className="text-center py-8 text-dark-500">
                No recent requests
              </div>
            )}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
