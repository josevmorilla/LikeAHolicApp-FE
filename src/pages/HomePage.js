import React from "react";
import "../styles/HomePage.css"; // Ensure this CSS file exists

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="welcome-section">
                <h1>Welcome to LikeAHolic!</h1>
                <p>Share your thoughts, connect with others, and enjoy the experience!</p>
            </div>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} LikeAHolic. All rights reserved.</p>
                <p>Designed by Jose Villegas, Jean David Paralles</p>
            </footer>
        </div>
    );
};

export default HomePage;
