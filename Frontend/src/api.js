import axios from "axios";
const api = axios.create({
  baseURL:"http://127.0.0.1:8000/" ,// is for amazon ec2 =>  http://13.60.83.205:8000/
  timeout: 5000, // Optional timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;