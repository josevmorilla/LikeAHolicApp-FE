import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import PostCard from "./PostCard";
import { createPost, deletePost, fetchPosts, updatePost } from "../../services/api";

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
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
        <div className="text-center">
            <h1 className="my-4">Posts List</h1>
            <Button variant="primary" onClick={() => handleShowModal("create")} className="mb-4">
                Create New Post
            </Button>
            <Container fluid>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {posts.map((post) => (
                        <Col key={post.id}>
                            <PostCard post={post} />
                            <div className="d-flex justify-content-center mt-2">
                                <Button
                                    variant="secondary"
                                    className="me-2"
                                    onClick={() => handleShowModal("update", post)}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDeletePost(post.id)}>
                                    Delete
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal for Create/Edit */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "create" ? "Create New Post" : "Edit Post"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="text"
                                name="content"
                                value={formData.content}
                                onChange={handleFormChange}
                                placeholder="Write your post content here"
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
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-4">
                            {modalMode === "create" ? "Create Post" : "Update Post"}
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PostList;
