import axios from "axios";

// ✅ create instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("Token:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`; // IMPORTANT
  }

  return req;
});

export default API;