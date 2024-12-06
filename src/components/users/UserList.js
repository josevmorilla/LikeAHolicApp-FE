import React, {useEffect, useState} from "react";
import {Button, Container, Form, Modal} from "react-bootstrap";
import UserCard from "./UserCard";
import {createUser, deleteUser, fetchUsers, updateUser} from "../../services/api";
import '../../styles/UserList.css';

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
        <div className="user-list-page">
            <div className="list-hero-section">
                <h1>User List</h1>
                <Button
                    className="create-button"
                    onClick={() => handleShowModal("create")}
                >
                    <i className="button-icon">👤</i> Add New User
                </Button>
            </div>

            <Container className="users-container">
                <div className="users-grid">
                    {users.map((user) => (
                        <div key={user.id} className="user-item">
                            <UserCard user={user} />
                            <div className="user-actions">
                                <Button
                                    className="edit-button"
                                    onClick={() => handleShowModal("update", user)}
                                >
                                    <i className="button-icon">✏️</i> Edit
                                </Button>
                                <Button
                                    className="delete-button"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    <i className="button-icon">🗑️</i> Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalMode === "create" ? "Add New User" : "Edit User"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                className="form-input"
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
                                className="form-input"
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
                                className="form-input"
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
                                className="form-input"
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
                                className="form-input"
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
                                className="form-input"
                                type="text"
                                name="bio"
                                value={formData.bio}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="location" className="mt-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                className="form-input"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleFormChange}
                            />
                        </Form.Group>
                        <Button type="submit" className="submit-button mt-4">
                            {modalMode === "create" ? "Create User" : "Update User"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UserList;
