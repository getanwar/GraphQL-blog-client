import React, { Component } from 'react';
import Comments from './Comments';
import BlogListItem from './BlogListItem';
import fetchAsync from '../util/fetchAsync';

class Author extends Component {
    state = {
        author: null
    }

    fetchAuthor = (id) => {
        const query = `{
            author(id: "${id}"){
                name
                posts{
                    id
                    title
                    content
                    author{
                        id
                        name
                    }
                    category{
                        slug
                        name
                    }
                }
                comments{
                    comment
                    website
                    author{
                        id
                        name
                    }
                    post{
                        id
                        title
                    }
                }
            }
        }`
        fetchAsync(query).then(res => {
            if (res.data) {
                this.setState({author: res.data.author});
            }
            console.log(res);
        })
    }

    componentDidMount() {
        const { authorId } = this.props.match.params;
        this.fetchAuthor(authorId);
    }

    render() {
        const { author } = this.state;
        if(author) {
        return (
            <div>
                <h2>All Posts by {author.name}</h2>
                <hr />
                {author.posts.map((post, i) => (
                    <BlogListItem key={i} post={post} />
                ))}

                <h2 className="mt-5">All Comments made by {author.name}</h2>
                <hr />
                <Comments comments={author.comments} />
            </div>
        )
        } else {
            return <div>Loading author data...</div>
        }
    }
}

export default Author;