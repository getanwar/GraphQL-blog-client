import React, { Component } from 'react';
import fetchAsync from '../util/fetchAsync';

class Login extends Component {
    state = {
        email: '',
        password: '',
        processing: false
    }
    formSubmit = (event) => {
        event.preventDefault();
        this.setState({processing: true});
        let { path } = this.props.match;
        const { email, password } = this.state;
        const mutation = path === '/login' ? 'login' : 'signup';
        const query = `mutation {
            ${mutation} (email: "${email}", password: "${password}") {
                email
            }
        }`;
        fetchAsync(query).then(res => {
            const success = res.data[mutation];
            this.setState({processing: false});
            if(success) {
                this.props.history.push('/');
                this.props.onSuccess();
            }
        });
    }
    render() {
        let { path } = this.props.match;
    
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form onSubmit={this.formSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input 
                                type="email" 
                                name="email"
                                className="form-control" 
                                value={this.state.email}
                                onChange={e => this.setState({email: e.target.value})}
                            />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                name="password"
                                className="form-control" 
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                            />
                        </div>
                        <button className="btn btn-primary">{path === '/login' ? 'Login' : 'Signup'} {this.state.processing && '...'}</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;