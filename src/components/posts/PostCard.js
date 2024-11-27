import React from 'react';

const PostCard = ({ post }) => {
    if (!post) {
        return <div>Invalid post data</div>;
    }

    return (
        <div className="post-card">
            <div className="post-content">
                <p>{post.content}</p>
                <div className="post-metadata">
                    <span>Likes: {post.likesCount}</span>
                    <span>Comments: {post.commentsCount}</span>
                    <span>Posted: {new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;