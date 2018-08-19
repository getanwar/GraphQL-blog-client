import React, { Component } from 'react';
import fetchAsync from '../util/fetchAsync';

class CommentForm extends Component {
    state = {
        email: '',
        author: '',
        website: '',
        comment: '',
        authorId: '',
        postSuccess: false
    }

    addAuthor = async() => {
        const query = `mutation{
            addAuthor(name: "${this.state.author}") {
                id,
                name
            }
        }`;
        const author = await fetchAsync(query);
        localStorage.setItem('author', JSON.stringify(author.data.addAuthor));
        return author.data.addAuthor;
    }

    removeCurrentAuthor = () => {
        localStorage.removeItem('author');
        this.setState({
            authorId: '',
            author: ''
        });
    }

    submitComment = async(event) => {
        event.preventDefault();
        let { authorId } = this.state;
        const { postId, refetchQuery } = this.props;
        const { comment, email, website } = this.state;
        if (!authorId) {
            const data = await this.addAuthor();
            authorId = data.id;
            this.setState({
                authorId: data.id,
                author: data.name
            });
        }

        const query = `
            mutation{
                addComment(
                    email: "${email}"
                    postId: "${postId}"
                    website: "${website}"
                    comment: """${comment}"""
                    authorId: "${authorId}"
                ){
                    comment
                }
            }
        `;
        const data = await fetchAsync(query);
        if (data) {
            this.setState({
                email: '',
                website: '',
                comment: '',
                postSuccess: true
            });
            refetchQuery();
        }
    }

    componentDidMount() {
        let author = localStorage.getItem('author');
        if (author) {
            author = JSON.parse(author);
            this.setState({
                authorId: author.id,
                author: author.name
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <h5 className="mb-3">Add New Comment</h5>
                <form onSubmit={this.submitComment}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                readOnly={this.state.authorId}
                                className={this.state.authorId ? 'form-control-plaintext' : 'form-control'}
                                value={this.state.author}
                                onChange={ e => this.setState({author: e.target.value}) }
                                />
                                {this.state.authorId && <span onClick={this.removeCurrentAuthor} className="badge badge-danger cursor-pointer">x</span>}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.email}
                                onChange={ e => this.setState({email: e.target.value}) }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Website</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={this.state.website}
                                onChange={ e => this.setState({website: e.target.value}) }
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Comment</label>
                        <div className="col-sm-10">
                            <textarea
                                className="form-control" 
                                placeholder="Write your comment" 
                                value={this.state.comment}
                                onChange={ e => this.setState({comment: e.target.value}) }
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <button className="btn btn-primary">Post Comment</button>
                    </div>
                </form>
                { this.state.postSuccess ? 
                <div className="text-center alert alert-success mt-3" role="alert">
                    Comment posted successfully!
                </div>
                : 
                null
                }
            </React.Fragment>
        );
    }
}

export default CommentForm;