import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import UserCard from "./UserCard";
import {createUser, deleteUser, fetchUsers, updateUser} from "../../services/api";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create"); // "create" or "update"
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        bio: '',
        location: '',
    });
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers().then((response) => setUsers(response.data));
    }, []);

    const handleShowModal = (mode, user = null) => {
        setModalMode(mode);
        if (mode === "update" && user) {
            setSelectedUser(user);
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '', // Don't pre-fill password for security reasons
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                bio: user.bio || '',
                location: user.location || '',
            });
        } else {
            setSelectedUser(null);
            setFormData({
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                bio: '',
                location: '',
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            bio: '',
            location: '',
        });
    };

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const currentJoinDate = new Date().toISOString(); // Automatically set join date
        const dataToSubmit = {
            ...formData,
            joinDate: currentJoinDate,
        };

        if (modalMode === "create") {
            createUser(dataToSubmit)
                .then(() => fetchUsers().then((response) => setUsers(response.data)))
                .catch((error) => console.error("Error creating user:", error));
        } else if (modalMode === "update" && selectedUser) {
            updateUser(selectedUser.id, dataToSubmit)
                .then(() => fetchUsers().then((response) => setUsers(response.data)))
                .catch((error) => console.error("Error updating user:", error));
        }
        handleCloseModal();
    };

    const handleDeleteUser = (id) => {
        deleteUser(id)
            .then(() => fetchUsers().then((response) => setUsers(response.data)))
            .catch((error) => console.error("Error deleting user:", error));
    };

    return (
        <div className="center">
            <h1>User List</h1>
            <Button variant="primary" onClick={() => handleShowModal("create")} className="mb-4">
                Add New User
            </Button>
            <Container fluid>
                <Row sm={1} md={2} lg={3} className="justify-content-evenly">
                    {users.map((user) => (
                        <Col key={user.id} className="mb-4">
                            <UserCard user={user}/>
                            <Button
                                variant="secondary"
                                className="mt-2 me-2"
                                onClick={() => handleShowModal("update", user)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                className="mt-2"
                                onClick={() => handleDeleteUser(user.id)}
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
                    <Modal.Title>{modalMode === "create" ? "Add New User" : "Edit User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormChange}
                                required={modalMode === "create"} // Only required for new user creation
                            />
                        </Form.Group>
                        <Form.Group controlId="firstName" className="mt-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="lastName" className="mt-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="bio" className="mt-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="location" className="mt-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            {modalMode === "create" ? "Create User" : "Update User"}
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

export default UserList;
