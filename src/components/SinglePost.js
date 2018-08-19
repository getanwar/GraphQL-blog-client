import React, { Component } from 'react';
import PostMeta from './PostMeta';
import Comments from './Comments';
import fetchAsync from '../util/fetchAsync';
import CommentForm from './CommentForm';

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: null,
            post: props.location.state && props.location.state.post,
        }
    }

    fetchPost = async() => {
        const { postId } = this.props.match.params;
        const query = `{
            post(id: "${postId}") {
                id
                title
                content
                datetime
                author{
                    id
                    name
                }
                category{
                    name
                }
            }
        }`;
        return fetchAsync(query);
    }

    fetchComments = () => {
        console.log('fetching...');
        const query = `{
            comments(postId: "${this.props.match.params.postId}") {
                email
                website
                comment
                author{
                    id
                    name
                }
            }
        }`;
        fetchAsync(query).then(res => {
            this.setState({
                comments: res.data.comments
            });
        });
    }

    componentDidMount() {
        this.fetchComments();
        if (!this.state.post) {
            this.fetchPost().then(res => {
                const { post } = res.data;
                this.setState({ post });
            });
        }
    }
    
    render() {
        const { post, comments } = this.state;
        if (post) {
            return (
                <React.Fragment>
                    <h2>{post.title}</h2>
                    <PostMeta {...post} />
                    <p>{post.content}</p>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mt-4">
                                {comments &&
                                    <React.Fragment>
                                        <h3>{comments.length} Comment{comments.length > 1 && 's'}</h3>
                                        {comments.length ? <hr /> : null}
                                    </React.Fragment>
                                }
                                <Comments comments={comments} />
                                <hr />
                                <CommentForm postId={post.id} refetchQuery={this.fetchComments} />
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return <div>Loading the post...</div>
        }
    }
}

export default SinglePost;