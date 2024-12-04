import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/app/Header';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';

function UserPage() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetchUsers();
                const foundUser = response.data.find(u => u.id === parseInt(id));
                setUser(foundUser);
            } catch (error) {
                console.error('Error loading user:', error);
            }
        };

        loadUser();
    }, [id]);

    const handleCreateUser = (newUser) => {
        createUser("users", newUser)
            .then(() => fetchUsers("users").then((response) => setUser(response.data)))
            .catch((error) => console.error("Error creating user:", error));
    };

    const handleUpdateUser = (id, updatedUser) => {
        updateUser("users", id, updatedUser)
            .then(() => fetchUsers("users").then((response) => setUser(response.data)))
            .catch((error) => console.error("Error updating resource:", error));
    };

    const handleDeleteUser = (id) => {
        deleteUser("users", id)
            .then(() => fetchUsers("users").then((response) => setUser(response.data)))
            .catch((error) => console.error("Error deleting resource:", error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="user-page">
            <Header />
            <div className="user-profile">
                <h1>{user.username}'s Profile</h1>
                {/* Add more user details here */}
            </div>
        </div>
    );
}

export default UserPage;