import axios from "axios";

class Api {
  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response) {
          console.error("Response error:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request error:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  get(url) {
    return this.axiosInstance.get(url);
  }

  post(url, payload) {
    return this.axiosInstance.post(url, payload);
  }

  put(url, payload) {
    return this.axiosInstance.put(url, payload);
  }
  delete(url) {
    return this.axiosInstance.delete(url);
  }
}
export default Api;