import axios from "axios";

const API = axios.create({
  baseURL: "https://nutrition-assistant-9jpo.onrender.com/api/users",
});

export default API;