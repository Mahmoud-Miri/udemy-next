import axios from "axios";

const instance = axios.create({
  baseURL: "https://mahmoud-miri.vercel.app",
});

instance.interceptors.request.use(
  (config) => {
    // Add your request interceptor logic here
    return config;
  },
  (error) => {
    // Handle your request interceptor error here
    return Promise.reject(error);
  }
);

export default instance;
