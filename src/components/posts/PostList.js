import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PostCard from "./PostCard";
import { fetchPosts } from "../../services/api";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then((response) => setPosts(response.data));
    }, []);

    return (
        <div className="center">
            <h1>Post List</h1>
            <Container fluid>
                <Row sm={1} md={2} lg={3} className="justify-content-evenly">
                    {posts.map((post) => (
                        <Col key={post.id} className="mb-4">
                            <PostCard post={post} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default PostList;
