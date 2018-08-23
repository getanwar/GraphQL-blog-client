import React, { Component } from 'react';
import fetchAsync from '../util/fetchAsync';

class NavbarAuth extends Component {
	logout = (event) => {
		event.preventDefault();
		const query = `mutation {
			logout{
				email
			}
		}`;
		fetchAsync(query).then(res => {
			const success = res.data.logout;
			if(success) {
				this.props.onLogout();
			}
		});
	}
	redirect = (event, path) => {
		event.preventDefault();
		window.location = '/GraphQL-blog-client' + path;
	}
    render() {
        if (false === this.props.authUser) return null;
        if(this.props.authUser) {
			return (
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" href="/logout" onClick={this.logout}>Logout</a>
					</li>
				</ul>
			);
        } else {
            return (
				<ul className="navbar-nav">
					<li className="nav-item">
						<button className="btn btn-primary" onClick={(e) => this.redirect(e, '/login')}>Login</button>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/signup" onClick={(e) => this.redirect(e, '/signup')}>Sign Up</a>
					</li>
				</ul>
			);
        }
    }
};

export default NavbarAuth;