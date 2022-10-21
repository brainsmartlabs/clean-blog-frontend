import React from 'react';
import { Link } from 'react-router-dom';


function Navbar(props) {

    function signOutSafely(){
        props.setIsLoggedIn(false);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">Bajji Blogs</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">Home</Link></li>

                        {props.isLoggedIn && (
                            <li className="nav-item"><Link to="/myBlogs" className="nav-link px-lg-3 py-3 py-lg-4">My Blogs</Link></li>
                        )}

                        {props.isLoggedIn && (
                            <li className="nav-item"><Link to="/blogs/add" className="nav-link px-lg-3 py-3 py-lg-4">Create Blog</Link></li>
                        )}

                        {(!props.isLoggedIn) && (
                            <li className="nav-item"><Link to="/auth" className="nav-link px-lg-3 py-3 py-lg-4">Login</Link></li>
                        )}

                        {(!props.isLoggedIn) && (
                            <li className="nav-item"><Link to="/auth/newUser" className="nav-link px-lg-3 py-3 py-lg-4">New User</Link></li>
                        )}

                        {props.isLoggedIn && (
                            <li className="nav-item"><Link to="/auth/logout" onClick={signOutSafely} className="nav-link px-lg-3 py-3 py-lg-4">Logout</Link></li>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
