import React from 'react';
import PostMeta from './PostMeta';
import { Link } from 'react-router-dom';

const BlogListItem = props => {
    const { post } = props;
    return (
        <div className="mt-4">
            <h2 className="post-title"><Link to={{ pathname: "/post/" + post.id, state: {post} }}>{post.title}</Link></h2>
            <PostMeta {...post} />
            <p>{post.content.slice(0, 200)}... <Link to={"/post/" + post.id}>more</Link></p>
        </div>
    );
}

export default BlogListItem;

