import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Wrench } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import DashboardLayout from '../../components/DashboardLayout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import Badge from '../../components/Badge';
import { serviceService } from '../../services/serviceApi';

const AdminServices = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    basePrice: '',
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await serviceService.getAll();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await serviceService.create(formData);
      setShowModal(false);
      fetchServices();
      resetForm();
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      nameAr: '',
      nameEn: '',
      descriptionAr: '',
      descriptionEn: '',
      basePrice: '',
      isActive: true,
    });
  };

  if (loading) return <DashboardLayout><Loading /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-dark-800 font-display">
              {t('services')}
            </h1>
            <p className="text-dark-500 mt-1">
              {t('serviceList')}
            </p>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={20} />}
            onClick={() => setShowModal(true)}
          >
            {t('createService')}
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={service.isActive ? 'success' : 'danger'}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <span className="text-xs text-dark-500 font-mono">
                  {service.code}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-dark-800 mb-2">
                {language === 'ar' ? service.nameAr : service.nameEn}
              </h3>
              
              <p className="text-sm text-dark-600 mb-4 line-clamp-2">
                {language === 'ar' ? service.descriptionAr : service.descriptionEn}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-dark-500">{t('basePrice')}</p>
                  <p className="text-xl font-bold text-primary-600">
                    ${service.basePrice}
                  </p>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-primary-50 text-primary-600 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Wrench size={48} className="mx-auto text-dark-300 mb-4" />
              <p className="text-dark-500">No services available</p>
            </div>
          </Card>
        )}
      </div>

      {/* Create Service Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={t('createService')}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {t('cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {t('save')}
            </Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input
            label={t('serviceCode')}
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="SRV-001"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={`${t('serviceName')} (EN)`}
              value={formData.nameEn}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              placeholder="AC Maintenance"
              required
            />
            <Input
              label={`${t('serviceName')} (AR)`}
              value={formData.nameAr}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              placeholder="صيانة المكيفات"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label={`${t('serviceDescription')} (EN)`}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              placeholder="Complete AC maintenance service"
              required
            />
            <Input
              label={`${t('serviceDescription')} (AR)`}
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              placeholder="خدمة صيانة شاملة للمكيفات"
              required
            />
          </div>

          <Input
            label={t('basePrice')}
            type="number"
            value={formData.basePrice}
            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
            placeholder="100"
            required
          />
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default AdminServices;
