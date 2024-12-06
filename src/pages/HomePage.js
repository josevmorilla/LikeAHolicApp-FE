import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal} from "react-bootstrap";
import "../styles/HomePage.css";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleNavigation = (path) => {
        handleClose();
        navigate(path);
    };

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <h1>Welcome to LikeAHolic</h1>
                <p className="hero-subtitle">Share your thoughts, connect with others, and enjoy the experience</p>
                <div className="cta-buttons">
                    <button className="primary-btn" onClick={handleShow}>Get Started</button>

                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose LikeAHolic?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="feature-icon">🤝</i>
                        <h3>Connect</h3>
                        <p>Build relationships with people</p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon">🔁</i>
                        <h3>Share</h3>
                        <p>Express your thoughts and ideas with our community</p>
                    </div>
                    <div className="feature-card">
                        <i className="feature-icon">🌟</i>
                        <h3>Grow</h3>
                        <p>Learn and evolve with our environment</p>
                    </div>
                </div>
            </section>

            {/* Get Started Modal */}
            <Modal
                show={showModal}
                onHide={handleClose}
                centered
                className="get-started-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Here?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-options">
                        <div className="option-card" onClick={() => handleNavigation('/posts')}>
                            <i className="option-icon">✍️</i>
                            <h3>Create a Post</h3>
                            <p>Share your thoughts with the community</p>
                        </div>
                        <div className="option-card" onClick={() => handleNavigation('/users')}>
                            <i className="option-icon">👤</i>
                            <h3>Create a Profile</h3>
                            <p>Join our growing community</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-info">
                        <p>&copy; {new Date().getFullYear()} LikeAHolic. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;