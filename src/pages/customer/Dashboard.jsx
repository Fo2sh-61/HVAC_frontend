import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import Card from '../../components/Card';

const CustomerDashboard = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-accent-600 to-accent-800 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2 font-display">
            {t('welcome')} 👋
          </h1>
          <p className="text-accent-100">
            Customer {t('dashboard')}
          </p>
        </div>

        <Card title={t('myRequests')}>
          <p className="text-dark-600">Your service requests will appear here</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
