import Cookies from 'js-cookie';
import api from '../services/api';

export const setAuthToken = (token: string) => {
  Cookies.set('authToken', token, { expires: 7, secure: true });
};

export const getAuthToken = () => {
  return Cookies.get('authToken');
};

export const removeAuthToken = () => {
  Cookies.remove('authToken');
};

export const loginUser = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setAuthToken(response.data.token);
      return { success: true, token: response.data.token };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Invalid credentials' };
    }
};
