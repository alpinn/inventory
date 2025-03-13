import axios from 'axios';

const API_URL = 'http://localhost:5000/inventory';

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getAllInventory = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createInventory = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateInventory = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteInventory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}; 