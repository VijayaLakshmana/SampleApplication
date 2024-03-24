import axios from "axios";

class Api {
  constructor() {
    this.axiosInstance = axios.create();
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
}
export default Api;