import axios from "axios";
import useAuthStore from "../store/Auth";
import refreshToken from "./refreshToken";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState().getAuth();

    if (tokens?.token) {
      // console.log("interceptors setting token");
      config.headers.Authorization = `Bearer ${tokens?.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 666 && !error?.config.__isRetry) {
      const logOut = useAuthStore.getState().resetAuth;
      console.log("using refreshToken to get a new token...");
      error.config.__isRetry = true;
      const newToken = await refreshToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      if (newToken) {
        return client(error.config);
      }
      logOut();
    }
    return Promise.reject(error);
  }
);

export default client;
