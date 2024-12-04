import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v2",
    headers: {
        'Content-Type': 'application/json',
    },
});

// USER CRUD OPERATIONS
export const fetchUsers = () => API.get("/users");
export const createUser = (userData) => API.post("/users", userData);
export const updateUser = (userId, updatedData) => API.put(`/users/${userId}`, updatedData);
export const deleteUser = (userId) => API.delete(`/users/${userId}`);

// POST CRUD OPERATIONS
export const fetchPosts = () => API.get("/posts")
export const createPost = (postData) => API.post("/posts", postData);
export const updatePost = (postId, updatedData) => API.put(`/posts/${postId}`, updatedData);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
