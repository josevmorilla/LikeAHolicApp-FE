import React from "react";
import "../../styles/UserCard.css";

function UserCard({ user }) {
    if (!user) {
        return <div className="text-danger">Invalid user data</div>;
    }

    return (
        <div className="user-card">
            <h3 className="user-name">Name: {user.firstName} {user.lastName}</h3>
            <div className="user-details">
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Location: {user.location}</p>
                <p>Joined: {user.joinDate}</p>
                <p>Bio: {user.bio}</p>
            </div>
        </div>
    );
}

export default UserCard;