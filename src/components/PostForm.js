import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchAsync from '../util/fetchAsync';

class PostForm extends Component {
    state = {
        title: '',
        author: '',
        content: '',
        authorId: '',
        categoryId: '',
        categories: [],
        postSuccess: false
    }

    fetchCategories = () => {
        const query = `{
            categories{
                id
                name
            }
        }`;
        fetchAsync(query).then(res => {
            this.setState({
                categories: res.data.categories
            });
        });
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

    submitPost = async(event) => {
        event.preventDefault();
        let { authorId } = this.state;
        const { title, content, categoryId } = this.state;
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
                addPost(
                    title: "${title}"
                    content: """${content}"""
                    authorId: "${authorId}"
                    categoryId: "${categoryId}"
                ){
                    title
                }
            }
        `;
        const data = fetchAsync(query);
        if (data) {
            this.setState({
                title: '',
                content: '',
                categoryId: '',
                postSuccess: true
            });
        }
    }

    componentDidMount() {
        this.fetchCategories();

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
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-12 offset-md-2">
                        <h3>Add New Post</h3>
                        <hr/>
                        <form onSubmit={this.submitPost}>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Author</label>
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
                                <label className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.title}
                                        onChange={ e => this.setState({title: e.target.value}) }
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Category</label>
                                <div className="col-sm-10">
                                    <select onChange={e => this.setState({categoryId: e.target.value})} className="form-control">
                                        <option value="">Select Category</option>
                                        {this.state.categories && this.state.categories.map((cat, i) => {
                                            return <option value={cat.id} key={i}>{cat.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-10">
                                    <textarea
                                        className="form-control" 
                                        placeholder="" 
                                        value={this.state.content}
                                        onChange={ e => this.setState({content: e.target.value}) }
                                    />
                                </div>
                            </div>
                            <div className="text-right">
                                <button className="btn btn-primary">Submit Post</button>
                            </div>
                        </form>
                        { this.state.postSuccess ? 
                        <div className="text-center alert alert-success mt-3" role="alert">
                            Post submitted successfully! <Link to="/">See Posts</Link>
                        </div>
                        : 
                        null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PostForm;