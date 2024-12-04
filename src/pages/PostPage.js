import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/app/Header';
import { fetchPosts} from '../services/api';

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