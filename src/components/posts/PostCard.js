import React from "react";

const PostCard = ({ post }) => {
    if (!post) {
        return <div>Invalid post data</div>;
    }

    return (
        <div className="card mb-4 border">
            <div className="card-body">
                {/* Content Section */}
                <div className="mb-3 p-3 border">
                    <h5 className="card-title text-center mb-0">{post.content}</h5>
                </div>

                {/* User and Timestamp */}
                <div className="mb-3 p-2 border">
                    <h6 className="card-subtitle text-muted">
                        ID: {post.id}
                    </h6>
                    <p className="card-subtitle text-muted">
                        Date: {new Date(post.timestamp).toLocaleDateString()}
                    </p>
                </div>

                {/* Metadata (Likes and Comments) */}
                <div className="p-2 border">
                    <p className="mb-1">
                        Likes: {post.likesCount || 0}
                    </p>
                    <p className="mb-0">
                        Comments: {post.commentsCount || 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
