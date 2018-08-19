import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Author from './components/Author';
import Navbar from './components/Navbar';
import Category from './components/Category';
import PostForm from './components/PostForm';
import SinglePost from './components/SinglePost';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar />
				<div className="container">
					<Switch>
						<Route path="/add-post" component={PostForm} />
						<Route path="/post/:postId" component={SinglePost} />
						<Route path="/author/:authorId" component={Author} />
						<Route path="/category/:slug" component={Category} />
						<Route path="/" component={Home} />
					</Switch>
				</div>
				<hr className="mt-5" />
				<footer className="footer text-center mb-3">Designed and developed by Anwar Hussain with React, GraphQL, MongoDB & Bootstrap</footer>
			</React.Fragment>
		);
	}
}

export default App;
