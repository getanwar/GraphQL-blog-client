import React from 'react';
import { Link } from 'react-router-dom';

const PostMeta = props => {
    const cat = props.category ? props.category.name : 'Uncategorized';
    const slug = props.category ? props.category.slug : 'uncategorized';
    return (
        <p className="post-meta">Posted
            {} on <Link to={"/category/" + slug}><em>{cat}</em></Link> {' '}
            by: <Link to={"/author/" + props.author.id}><em>{props.author.name}</em></Link>
        </p>
    );
}

export default PostMeta;