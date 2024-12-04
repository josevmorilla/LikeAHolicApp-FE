import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import PostCard from "./PostCard";
import {createPost, deletePost, fetchPosts, updatePost} from "../../services/api";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // "create" or "update"
    const [formData, setFormData] = useState({
        content: '',
        userId: ''
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
                content: post.content || '',
            });
        } else {
            setSelectedPost(null);
            setFormData({
                content: '',
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            content: '',
        });
    };

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const currentTimestamp = new Date().toISOString(); // Get current date and time for timestamp
        const dataToSubmit = {
            ...formData,
            timestamp: currentTimestamp,
            likesCount: 0, // Default value
            commentsCount: 0, // Default value
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
        <div className="center">
            <h1>Posts List</h1>
            <Button variant="primary" onClick={() => handleShowModal("create")} className="mb-4">
                Create New Post
            </Button>
            <Container fluid>
                <Row sm={1} md={2} lg={3} className="justify-content-evenly">
                    {posts.map((post) => (
                        <Col key={post.id} className="mb-4">
                            <PostCard post={post}/>
                            <Button
                                variant="secondary"
                                className="mt-2 me-2"
                                onClick={() => handleShowModal("update", post)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                className="mt-2"
                                onClick={() => handleDeletePost(post.id)}
                            >
                                Delete
                            </Button>
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
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="userId"
                                value={formData.userId}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
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
