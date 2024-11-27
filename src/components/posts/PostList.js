import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { fetchPosts } from "../../services/api";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then((response) => setPosts(response.data));
    }, []);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
