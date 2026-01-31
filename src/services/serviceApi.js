import api from './api';

export const serviceService = {
  // Get all services
  getAll: async () => {
    const response = await api.get('/Customer/service');
    return response.data;
  },

  // Create service (Admin only)
  create: async (serviceData) => {
  const payload = {
    ...serviceData,
    basePrice: parseFloat(serviceData.basePrice) || 0,
    isActive: serviceData.isActive === true || serviceData.isActive === 'true',
  };
  const response = await api.post('/Admin/service', payload);
  return response.data;
},

  // Get service by ID
  getById: async (id) => {
    const response = await api.get(`/Admin/service/${id}`);
    return response.data;
  },
};

export const serviceRequestService = {
  // Get all service requests
  getAll: async (userRole) => {
    let endpoint = '/Admin/serviceRequest';
    if (userRole === 'Customer') {
      endpoint = '/Customer/Requests';
    } else if (userRole === 'Engineer') {
      endpoint = '/Engineer/serviceRequest';
    }
    const response = await api.get(endpoint);
    return response.data;
  },

  // Create service request (Customer)
  create: async (requestData) => {
    const formData = new FormData();
    Object.keys(requestData).forEach(key => {
      if (requestData[key] !== null && requestData[key] !== undefined) {
        formData.append(key, requestData[key]);
      }
    });
    const response = await api.post('/Customer/request', formData);
    return response.data;
  },

  // Get request by ID
  getById: async (id) => {
    const response = await api.get(`/Customer/${id}`);
    return response.data;
  },

  // Update request status (Engineer)
  updateStatus: async (id, status) => {
    const formData = new FormData();
    formData.append('status', status);
    const response = await api.put(`/Engineer/requests/${id}/status`, formData);
    return response.data;
  },

  // Update final price (Engineer)
  updatePrice: async (id, finalPrice) => {
    const formData = new FormData();
    formData.append('finalPrice', finalPrice.toString());
    const response = await api.put(`/Engineer/requests/${id}/price`, formData);
    return response.data;
  },

  // Assign engineer (Admin)
  assignEngineer: async (requestId, engineerId) => {
    const formData = new FormData();
    formData.append('engineerId', engineerId);
    const response = await api.put(`/Admin/AssignEngineer/${requestId}`, formData);
    return response.data;
  },
};

export const reviewService = {
  // Create review
  create: async (reviewData) => {
    const formData = new FormData();
    Object.keys(reviewData).forEach(key => {
      formData.append(key, reviewData[key]);
    });
    const response = await api.post('/Customer/Review', formData);
    return response.data;
  },
};
