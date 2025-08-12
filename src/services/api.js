import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend
});

export const getData = () => API.get("/siswa");
export const postData = (payload) => API.post("/siswa", payload);
