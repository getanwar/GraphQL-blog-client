import React, { Component } from 'react';
import BlogListItem from './BlogListItem';
import fetchAsync from '../util/fetchAsync';

class BlogList extends Component {
    state = {
        posts: null
    }
    fetchPosts = async() => {
        const query = `{
            posts{
                id
                title
                content
                datetime
                category{
                    slug
                    name
                }
                author{
                    id
                    name
                }
            }
        }`;
        const {data: { posts }} = await fetchAsync(query);
        this.setState({ posts });
        console.log(posts);
    }
    componentDidMount() {
        this.fetchPosts();
    }
    render() {
        const { posts } = this.state;
        if (!posts) {
            return <div>Loading posts...</div>
        } else {
            if(!posts.length) return <div>No Post Found!</div>
            return (
                <React.Fragment>
                    {posts.map((post, i) => (
                        <BlogListItem key={i} post={post} />
                    ))}
                </React.Fragment>
            );
        }
    }
}

export default BlogList;