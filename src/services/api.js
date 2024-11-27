import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v2",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchUsers = () => API.get("/users");
export const fetchPosts = () => API.get("/posts");