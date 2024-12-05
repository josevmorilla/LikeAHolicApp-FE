import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import {createPost, deletePost, fetchPosts, updatePost} from "../../services/api";
import '../../styles/PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // "create" or "update"
    const [formData, setFormData] = useState({
        content: "",
        userId: "",
    });
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetchPosts().then((response) => setPosts(response.data));
    }, []);

    const handleShowModal = (mode, post = null) => {
        setModalMode(mode);
        if (mode === "update" && post) {
            setSelectedPost(post);
            setFormData({
                content: post.content || "",
                userId: post.userId || "",
            });
        } else {
            setSelectedPost(null);
            setFormData({
                content: "",
                userId: "",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            content: "",
            userId: "",
        });
    };

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const currentTimestamp = new Date().toISOString();
        const dataToSubmit = {
            ...formData,
            timestamp: currentTimestamp,
            likesCount: 0,
            commentsCount: 0,
        };

        if (modalMode === "create") {
            createPost(dataToSubmit)
                .then(() => fetchPosts().then((response) => setPosts(response.data)))
                .catch((error) => console.error("Error creating post:", error));
        } else if (modalMode === "update" && selectedPost) {
            updatePost(selectedPost.id, dataToSubmit)
                .then(() => fetchPosts().then((response) => setPosts(response.data)))
                .catch((error) => console.error("Error updating post:", error));
        }
        handleCloseModal();
    };

    const handleDeletePost = (id) => {
        deletePost(id)
            .then(() => fetchPosts().then((response) => setPosts(response.data)))
            .catch((error) => console.error("Error deleting post:", error));
    };

    return (
        <div className="text-center bg-light" style={{minHeight: "100vh", paddingTop: "20px", textAlign: "center"}}>
            <h1 className="text-primary mb-4" style={{fontWeight: "bold", color: "blue", textAlign: "center"}}>
                Posts List
            </h1>
            <Button
                variant="success"
                onClick={() => handleShowModal("create")}
                className="mb-4 shadow"
                style={{fontSize: "1.2rem"}}
            >
                Create New Post
            </Button>
            <Container fluid>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {posts.map((post) => (
                        <Col key={post.id}>
                            <PostCard post={post}/>
                            <div className="d-flex justify-content-center mt-2">
                                <Button
                                    variant="warning"
                                    className="me-2 shadow"
                                    onClick={() => handleShowModal("update", post)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="shadow"
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal for Create/Edit */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>
                        {modalMode === "create" ? "Create New Post" : "Edit Post"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="text"
                                name="content"
                                value={formData.content}
                                onChange={handleFormChange}
                                placeholder="Write your post content here"
                                className="shadow-sm"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="userId" className="mt-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="userId"
                                value={formData.userId}
                                onChange={handleFormChange}
                                placeholder="Enter user ID"
                                className="shadow-sm"
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-4 shadow"
                            style={{width: "100%"}}
                        >
                            {modalMode === "create" ? "Create Post" : "Update Post"}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="bg-secondary text-white">
                    <Button variant="light" onClick={handleCloseModal} className="shadow-sm">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PostList;
