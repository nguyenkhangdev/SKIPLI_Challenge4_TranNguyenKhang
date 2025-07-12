import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

//response fotmat same as api
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {

    if (error.response?.data) {
      return Promise.resolve(error.response.data);
    }

    return Promise.resolve({
      status: false,
      message: error.message || "Unknown error",
      data: null,
    });
  }
);

export default api;
