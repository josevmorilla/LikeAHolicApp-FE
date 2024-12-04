import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
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
        </nav>
    );
};

export default Header;