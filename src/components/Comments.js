import React from 'react';
import { Link } from 'react-router-dom';

const buildUrl = string => {
    const http = string.match(/^https?:\/\//);
    if(string && !http) {
        return 'http://'+string;
    }
    return string;
};

const Comments = props => {
    const { comments } = props;
    if (comments) {
        return (
            <div>
                {comments.map((comment, i) => (
                    <ul key={i} className="comments list-unstyled">
                        <li className="media">
                            <img className="mr-3" src="https://via.placeholder.com/64x64" alt={comment.author.name} />
                            <div className="media-body">
                                <div className="comment-meta">
                                    <h5 className="comment-heading mt-0 mb-1">
                                        <a href={buildUrl(comment.website)}>
                                            {comment.author.name}
                                        </a>
                                    </h5>
                                    <span>
                                        {comment.post && ' - on ' }
                                        {comment.post && <Link to={"/post/" + comment.post.id}>{comment.post.title}</Link>}
                                    </span>
                                </div>
                                {comment.comment}
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        );
    } else {
        return <div>Loading comments...</div>
    }
}

export default Comments;