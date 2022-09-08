import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import login from './Login.module.scss';

function Login() {

    //use History
    const history = useHistory();

    //initializing variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            {/* <h1>LOGIN PAGE</h1>
            <button className='btn btn-primary ' style={{ height: "40px" }}>
                <Link to='/mainPage' style={{ color: "white" }}>
                    Main Page
                </Link>
            </button>
            <button className='btn btn-primary ' style={{ height: "40px" }}>
                <Link to='/salesPerson' style={{ color: "white" }}>
                    Sales Person
                </Link>
            </button> */}


            <div className={login.login_container}>
                <div className={login.loginform_container}>
                    <div className={login.form_container}>
                        <form className={login.form} >
                            <h1>LogIn</h1>
                            <input
                                type='text'
                                placeholder='Email'
                                name='email'
                                required
                                className={login.input}
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                required
                                className={login.input}
                            />
                            <button type='submit' className={login.greenBtn}>LogIn</button>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login;