import axios from "axios";

const base = axios.create({
  // baseURL: "http://localhost:9000/api",
  baseURL: "https://mern-social-backend.herokuapp.com/api",
});

export default base;
