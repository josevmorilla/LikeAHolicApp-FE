import React from "react";
import Header from "../components/app/Header"; // Ensure you have a Header component
import PostList from "../components/posts/PostList"; // Placeholder for post grid

const HomePage = () => {
    return (
        <div className="homepage">
            {/* Header Component */}
            <Header />

            {/* Welcome Section */}
            <div className="welcome-section">
                <h1>Welcome to LikeAHolic!</h1>
                <p>Share your thoughts, connect with others, and enjoy the experience!</p>
            </div>

            {/* Post Grid */}
            <div className="post-grid">
                <PostList />
            </div>
        </div>
    );
};

export default HomePage;
