import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import PostList from "./components/posts/PostList";
import UserList from "./components/users/UserList";
import Header from "./components/app/Header";
import "./styles/theme.css"; // Add theme-related styles

const App = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.body.className = savedTheme;
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.body.className = newTheme;
    };

    return (
        <Router>
            <Header toggleTheme={toggleTheme} theme={theme} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/users/:id" element={<UserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
