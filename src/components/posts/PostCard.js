import React from "react";
import { Card } from "react-bootstrap";

function PostCard({post}) {
    if (!post) {
        return <div>Invalid post data</div>;
    }
    return (
        <Card style={{ width: "18rem" }} className="mb-4">
            <Card.Body>
                <Card.Title>{post.content}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">ID: {post.id}</Card.Subtitle>
                <Card.Text>Date: {new Date(post.timestamp).toLocaleDateString()}</Card.Text>
                <Card.Text>Likes: {post.likesCount || 0}</Card.Text>
                <Card.Text>Comments: {post.commentsCount || 0}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PostCard;
