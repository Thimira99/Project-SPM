import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <h1>LOGIN PAGE</h1>
            <button>
                <Link to='/mainPage'>
                    Main Page
                </Link>
            </button>
        </>
    )
}

export default Login;