import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import Card from '../../components/Card';

const EngineerDashboard = () => {
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2 font-display">
            {t('welcome')} 👋
          </h1>
          <p className="text-green-100">
            Engineer {t('dashboard')}
          </p>
        </div>

        <Card title={t('assignedToMe')}>
          <p className="text-dark-600">Your assigned requests will appear here</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EngineerDashboard;
