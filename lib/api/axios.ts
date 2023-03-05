import axios from "axios";
import getConfig from "next/config";

const instance = axios.create({
  baseURL: getConfig().publicRuntimeConfig.PUBLIC_API_BASE_URL,
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
