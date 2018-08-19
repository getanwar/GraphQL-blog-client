import React, { Component } from 'react';
import fetchAsync from '../util/fetchAsync';
import BlogListItem from './BlogListItem';

class Category extends Component {
    state = {
        category: null
    }
    fetchCategory = (slug) => {
        const query = `{
            category(slug: "${slug}"){
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
            }
        }`;
        fetchAsync(query).then(res => {
            this.setState({
                category: res.data.category
            });
            console.log(res)
        });
    }
    componentDidMount() {
        const { slug } = this.props.match.params;
        this.fetchCategory(slug);
    }
    render() {
        const { category } = this.state;
        if (category) {
            return (
                <div>
                    <h3>Category: {category.name}</h3>
                    <hr />
                    {category.posts.map((post, i) => (
                        <BlogListItem key={i} post={post} />
                    ))}
                </div>
            );
        } else {
            return <div>Loading category data...</div>
        }
    }
}

export default Category;