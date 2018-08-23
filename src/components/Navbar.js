import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NavbarAuth from './NavbarAuth';

const Navbar = props => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
            <Link className="navbar-brand" to="/">GQL Blog</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    {props.authUser ?
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/add-post">+ Add New</NavLink>
                        </li>
                        :
                        null
                    }
                </ul>
                <div className="navbar-right">
                    <NavbarAuth {...props} />
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;