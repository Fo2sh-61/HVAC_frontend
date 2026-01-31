import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Common
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    search: 'Search',
    filter: 'Filter',
    actions: 'Actions',
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    
    // Auth
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    username: 'Username',
    phoneNumber: 'Phone Number',
    address: 'Address',
    role: 'Role',
    loginTitle: 'Login to Your Account',
    registerTitle: 'Create New Account',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    
    // Roles
    admin: 'Admin',
    customer: 'Customer',
    engineer: 'Engineer',
    
    // Services
    services: 'Services',
    serviceCode: 'Service Code',
    serviceName: 'Service Name',
    serviceDescription: 'Description',
    basePrice: 'Base Price',
    createService: 'Create Service',
    editService: 'Edit Service',
    serviceList: 'Service List',
    
    // Service Requests
    requests: 'Requests',
    serviceRequests: 'Service Requests',
    createRequest: 'Create Request',
    requestDetails: 'Request Details',
    acCount: 'AC Units Count',
    preferredDateTime: 'Preferred Date & Time',
    status: 'Status',
    estimatedPrice: 'Estimated Price',
    finalPrice: 'Final Price',
    notes: 'Notes',
    completedAt: 'Completed At',
    
    // Status
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    notStarted: 'Not Started',
    
    // Engineers
    engineers: 'Engineers',
    assignEngineer: 'Assign Engineer',
    specialization: 'Specialization',
    yearsOfExperience: 'Years of Experience',
    
    // Reviews
    reviews: 'Reviews',
    rating: 'Rating',
    comment: 'Comment',
    writeReview: 'Write Review',
    
    // Dashboard
    totalServices: 'Total Services',
    totalRequests: 'Total Requests',
    totalEngineers: 'Total Engineers',
    recentRequests: 'Recent Requests',
    myRequests: 'My Requests',
    assignedToMe: 'Assigned to Me',
    
    // Messages
    loginSuccess: 'Login successful!',
    loginError: 'Invalid email or password',
    registerSuccess: 'Registration successful!',
    createSuccess: 'Created successfully!',
    updateSuccess: 'Updated successfully!',
    deleteSuccess: 'Deleted successfully!',
    assignSuccess: 'Engineer assigned successfully!',
  },
  
  ar: {
    // Common
    welcome: 'مرحباً',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    search: 'بحث',
    filter: 'تصفية',
    actions: 'إجراءات',
    submit: 'إرسال',
    back: 'رجوع',
    next: 'التالي',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    fullName: 'الاسم الكامل',
    username: 'اسم المستخدم',
    phoneNumber: 'رقم الهاتف',
    address: 'العنوان',
    role: 'الدور',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    registerTitle: 'إنشاء حساب جديد',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    
    // Roles
    admin: 'مدير',
    customer: 'عميل',
    engineer: 'مهندس',
    
    // Services
    services: 'الخدمات',
    serviceCode: 'رمز الخدمة',
    serviceName: 'اسم الخدمة',
    serviceDescription: 'الوصف',
    basePrice: 'السعر الأساسي',
    createService: 'إنشاء خدمة',
    editService: 'تعديل الخدمة',
    serviceList: 'قائمة الخدمات',
    
    // Service Requests
    requests: 'الطلبات',
    serviceRequests: 'طلبات الخدمة',
    createRequest: 'إنشاء طلب',
    requestDetails: 'تفاصيل الطلب',
    acCount: 'عدد وحدات التكييف',
    preferredDateTime: 'التاريخ والوقت المفضل',
    status: 'الحالة',
    estimatedPrice: 'السعر المقدر',
    finalPrice: 'السعر النهائي',
    notes: 'ملاحظات',
    completedAt: 'تم الإنجاز في',
    
    // Status
    pending: 'قيد الانتظار',
    inProgress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغى',
    notStarted: 'لم يبدأ',
    
    // Engineers
    engineers: 'المهندسون',
    assignEngineer: 'تعيين مهندس',
    specialization: 'التخصص',
    yearsOfExperience: 'سنوات الخبرة',
    
    // Reviews
    reviews: 'التقييمات',
    rating: 'التقييم',
    comment: 'التعليق',
    writeReview: 'كتابة تقييم',
    
    // Dashboard
    totalServices: 'إجمالي الخدمات',
    totalRequests: 'إجمالي الطلبات',
    totalEngineers: 'إجمالي المهندسين',
    recentRequests: 'الطلبات الأخيرة',
    myRequests: 'طلباتي',
    assignedToMe: 'المعينة لي',
    
    // Messages
    loginSuccess: 'تم تسجيل الدخول بنجاح!',
    loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    registerSuccess: 'تم التسجيل بنجاح!',
    createSuccess: 'تم الإنشاء بنجاح!',
    updateSuccess: 'تم التحديث بنجاح!',
    deleteSuccess: 'تم الحذف بنجاح!',
    assignSuccess: 'تم تعيين المهندس بنجاح!',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
