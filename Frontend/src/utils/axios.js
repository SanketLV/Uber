import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000",
  withCredentials: true,
});

// Add a request interceptor to handle authentication
instance.interceptors.request.use(
  (config) => {
    // You can add any auth headers here if needed
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
