import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/app/Header';
import { fetchPosts, createPost, deletePost, updatePost} from '../services/api';

function PostPage() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const loadPost = async () => {
            try {
                const response = await fetchPosts();
                const foundPost = response.data.find(u => u.id === parseInt(id));
                setPost(foundPost);
            } catch (error) {
                console.error('Error loading post:', error);
            }
        };

        loadPost();
    }, [id]);

    const handleCreatePost = (newPost) => {
        createPost("posts", newPost)
            .then(() => fetchPosts("posts").then((response) => setPost(response.data)))
            .catch((error) => console.error("Error creating post:", error));
    };

    const handleUpdatePost = (id, updatedPost) => {
        updatePost("posts", id, updatedPost)
            .then(() => fetchPosts("posts").then((response) => setPost(response.data)))
            .catch((error) => console.error("Error updating post:", error));
    };

    const handleDeletePost = (id) => {
        deletePost("posts", id)
            .then(() => fetchPosts("posts").then((response) => setPost(response.data)))
            .catch((error) => console.error("Error deleting post:", error));
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post-page">
            <Header />
            <div className="post-content">
                <h1>{post.content}</h1>
                {/* Add more post details here */}
            </div>
        </div>
    );
}

export default PostPage;