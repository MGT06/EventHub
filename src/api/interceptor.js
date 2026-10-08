import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:9000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('persist:loggedUser');
      
      window.location.href = '/auth/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;