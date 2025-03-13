import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

/**
 * Login user with credentials
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { id: number, username: string, role: string } }>}
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const data = response.data;
    
    if (data.token && data.user) {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } else {
      throw new Error('Invalid response format from server');
    }
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

/**
 * Register new user
 * @param {{ username: string, password: string, role: 'admin' | 'staff' }} userData
 * @returns {Promise<{ message: string }>}
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

/**
 * Get current user from local storage
 * @returns {{ token: string, user: { id: number, username: string, role: string } } | null}
 */

export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const userData = JSON.parse(userStr);
    if (!userData.token || !userData.user) {
      localStorage.removeItem('user');
      return null;
    }
    
    return userData;
  } catch (error) {
    console.error('Error getting current user:', error);
    localStorage.removeItem('user');
    return null;
  }
};