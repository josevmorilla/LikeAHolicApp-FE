import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/app/Header';
import { fetchUsers } from '../services/api';

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