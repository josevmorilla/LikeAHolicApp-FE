import React from "react";
import { Card } from "react-bootstrap";

const UserCard = ({ user }) => {
    return (
        <Card style={{ width: "18rem" }} className="mb-4">
            <Card.Body>
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
                <Card.Text>Email: {user.email}</Card.Text>
                <Card.Text>Location: {user.location}</Card.Text>
                <Card.Text>Joined: {new Date(user.joinDate).toLocaleDateString()}</Card.Text>
                <Card.Text>Bio: {user.bio}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default UserCard;
