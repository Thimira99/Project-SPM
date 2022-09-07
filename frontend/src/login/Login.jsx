import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <h1>LOGIN PAGE</h1>
            <button className='btn btn-primary ' style={{ height: "40px" }}>
                <Link to='/mainPage' style={{ color: "white" }}>
                    Main Page
                </Link>
            </button>
            <button className='btn btn-primary ' style={{ height: "40px" }}>
                <Link to='/salesPerson' style={{ color: "white" }}>
                    Sales Person
                </Link>
            </button>
        </>
    )
}

export default Login;