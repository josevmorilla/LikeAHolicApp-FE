import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const Header = ({ toggleTheme, theme }) => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <Link to="/">LikeAHolic</Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
            <button
                className="theme-toggle-button"
                onClick={toggleTheme}
            >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </nav>
    );
};

export default Header;
