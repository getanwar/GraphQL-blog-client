import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// Helpers
import fetchAsync from './util/fetchAsync';
// Components
import Home from './components/Home';
import Login from './components/Login';
import Author from './components/Author';
import Navbar from './components/Navbar';
import Category from './components/Category';
import PostForm from './components/PostForm';
import SinglePost from './components/SinglePost';

class App extends Component {
	state = {
		authUser: false
	}
	fetchAuthUser = () => {
		const query = `{
			authUser{
				id 
				email
			}
		}`;
		fetchAsync(query).then(res => {
			const { authUser } = res.data;
			this.setState({authUser});
		});
	}
	dismissAuth = () => {
		this.setState({authUser: null});
	}
	componentDidMount() {
		this.fetchAuthUser();
    }
	render() {
		return (
			<React.Fragment>
				<Navbar authUser={this.state.authUser} onLogout={this.dismissAuth} />
				<div className="container">
					<Switch>
						<Route path="/login" render={(machedProps) => <Login {...machedProps} onSuccess={this.fetchAuthUser} />} />
						<Route path="/signup" render={(machedProps) => <Login {...machedProps} onSuccess={this.fetchAuthUser} />} />
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
