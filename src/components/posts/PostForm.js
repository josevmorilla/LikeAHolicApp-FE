import React, {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';

function PostForm(props) {
    const post = props.post;
    const onSave = props.onSave;

    const [formData, setFormData] = useState({
        content: '',
        timestamp: '',
        likesCount: '',
        commentsCount: '',
        userId: ''
    });

    useEffect(() => {
        if (post) {
            setFormData({
                content: post.content || '',
                timestamp: post.timestamp || '',
                likesCount: post.likesCount || '',
                commentsCount: post.commentsCount || '',
                userId: post.userId || ''
            });
        }
    }, [post]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Saving post:', formData);
        onSave(formData, post ? post.postId : null);
    };

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit}>
                <h2>{post ? '✏️ Edit Post' : '🆕 Add New Post'}</h2>
                <Form.Group controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        type="text"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="timestamp">
                    <Form.Label>Timestamp</Form.Label>
                    <Form.Control
                        type="text"
                        name="timestamp"
                        value={formData.timestamp}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="likesCount">
                    <Form.Label>Likes Count</Form.Label>
                    <Form.Control
                        type="number"
                        name="likesCount"
                        value={formData.likesCount}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="commentsCount">
                    <Form.Label>Comments Count</Form.Label>
                    <Form.Control
                        type="number"
                        name="commentsCount"
                        value={formData.commentsCount}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="userId">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    {post ? '🔄 Update Post' : '🚀 Create Post'}
                </Button>
            </Form>
        </div>
    );
}

export default PostForm;
