import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, Container} from 'react-bootstrap';
import Header from '../components/app/Header';
import {fetchPosts} from '../services/api';

function PostPage() {
    const [post, setPost] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = await fetchPosts();
                const foundPost = response.data.find((u) => u.id === parseInt(id));
                setPost(foundPost);
            } catch (error) {
                console.error('Error loading post:', error);
            }
        };

        loadPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post-page">
            <Header/>
            <Container className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh', textAlign: "center"}}>
                <Card style={{width: '18rem',}}>
                    <Card.Body>
                        <Card.Title>Post Details</Card.Title>
                        <Card.Text>
                            <strong>Content:</strong> {post.content}
                        </Card.Text>
                        <Card.Text>
                            <strong>Timestamp:</strong> {post.timestamp}
                        </Card.Text>
                        <Card.Text>
                            <strong>Likes:</strong> {post.likesCount}
                        </Card.Text>
                        <Card.Text>
                            <strong>Comments:</strong> {post.commentsCount}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default PostPage;
