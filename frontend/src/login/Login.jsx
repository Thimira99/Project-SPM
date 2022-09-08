import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

//import jwt decorder
import jwt from 'jwt-decode';

//import toast msg
import { toastMsg } from '../toast';

import axios from 'axios';

import login from './Login.module.scss';

function Login() {

    //use History
    const history = useHistory();

    //initializing variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //handle submit
    function handleSubmit(e) {
        e.preventDefault();

        //set email and password to data
        const data = {
            email,
            password
        };

        //login post
        axios.post("http://localhost:8000/login", data).then((res) => {

            toastMsg('Login success.');

            console.log(res.data.data);
            //set token to a variable
            const token = res.data.data;

            //store user token in localstorage
            localStorage.setItem('user', JSON.stringify(jwt(token)));
            localStorage.setItem('Token', token);


            const { status, accountType } = jwt(token);

            console.log(status, accountType);

            if (status === false) {
                history.push('/updateEmployee');
            } else {
                if (accountType === 'admin') {
                    history.push("/mainPage");
                } else if (accountType === "Sales Rep") {
                    history.push("/salesPerson");
                }
            }
        }).catch(err => {
            //error handling
            if (err.response.data.status === false) {
                toastMsg(err.response.data.msg, 'error')
            }
        })
    }

    //handle email onchange
    function handleEmail(event) {
        setEmail(event.target.value);
    }

    //handle password onchange
    function handlePassword(event) {
        setPassword(event.target.value);
    }


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

            </button>
            <button className='btn btn-primary ' style={{ height: "40px" }}>
                <Link to='/stockManagement' style={{ color: "white" }}>
                    Stock Manager
                </Link>
            </button>

            </button> */}


            <div className={login.login_container}>
                <div className={login.loginform_container}>
                    <div className={login.form_container}>
                        <form className={login.form} onSubmit={handleSubmit}>
                            <h1>LogIn</h1>
                            <input
                                type='text'
                                placeholder='Email'
                                name='email'
                                required
                                onChange={handleEmail}
                                className={login.input}
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                required
                                onChange={handlePassword}
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