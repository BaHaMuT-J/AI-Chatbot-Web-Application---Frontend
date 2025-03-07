import type { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create the plugin
export default {
  install(app: App) {
    app.use(VueAxios, axios);
    app.provide("axios", axiosInstance); // For Composition API
  },
};

export { axiosInstance };
