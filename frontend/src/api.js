import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const translateToSign = (data) =>
  api.post("/api/multilingual-to-isl/", data);
