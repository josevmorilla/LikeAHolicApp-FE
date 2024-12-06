import React from "react";
import { Card, Badge } from "react-bootstrap";

function PostCard ({ post }) {
    if (!post) {
        return <div className="text-danger">Invalid post data</div>;
    }

    return (
        <Card style={{ width: "25rem", border: "1px solid #ddd", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign:"center"}} className="mb-4">
            <Card.Body style={{alignContent: "center"}}>
                <Card.Title style={{ fontWeight: "bold", fontSize: "1.25rem"}}>
                    {post.content}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <small>Post ID: {post.id}</small>
                </Card.Subtitle>
                <Card.Text>
                    <strong>Date:</strong> {new Date(post.timestamp).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                    <Badge bg="primary" style={{ marginRight: "5px", color: "blue"}}>
                        Likes: {post.likesCount || 0} ❤️
                    </Badge>
                    <Badge bg="secondary">
                        Comments: {post.commentsCount || 0} 💬
                    </Badge>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PostCard;
