import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

import createStyles from './CreateEmployee.module.scss';

import axios from 'axios';

import { createHeader } from '../../createHeader';

import { useHistory } from 'react-router-dom';

import { toastMsg } from '../../toast';


function CreateEmployee() {

    const history = useHistory();

    //initialize user variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobile, setMobile] = useState('');
    const [accountType, setAccountType] = useState('');

    //handle onChange
    function handleFirstName(event) {
        setFirstName(event.target.value);
    }

    function handleLastName(event) {
        setLastName(event.target.value);

    }

    function handleEmail(event) {
        setEmail(event.target.value);

    }

    function handleMobile(event) {
        setMobile(event.target.value)
    }

    function handleDateOfBirth(event) {
        setDateOfBirth(event.target.value)
    }

    function handleAccountType(event) {
        setAccountType(event.target.value)
    }


    //Handle Submit
    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            firstName,
            lastName,
            email,
            dateOfBirth,
            mobile,
            accountType
        };

        console.log(data);
        //header
        const headers = createHeader();

        //post
        axios.post("http://localhost:8000/create", data, headers).then(res => {
            toastMsg("Successfully Created");
            if (res.data.email === "Email Send") {
                toastMsg("Email Send", 'info');
            }
            history.push('/getUsers')
        }).catch(err => {
            toastMsg(err.response.data.message, 'error');
        })
    }


    return (
        <>
            <Navbar />

            <div>
                <div className={createStyles.form_container}>

                    <form className={createStyles.form} onSubmit={handleSubmit} >
                        <h1>Create Account</h1>
                        <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleFirstName}
                            required
                            className={createStyles.input}
                        />
                        <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleLastName}
                            required
                            className={createStyles.input}
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            onChange={handleEmail}
                            name='email'
                            required
                            className={createStyles.input}
                        />
                        <input
                            type='date'
                            placeholder='Date Of Birth'
                            onChange={handleDateOfBirth}
                            name='date'
                            required
                            className={createStyles.input}
                        />
                        <input
                            type='text'
                            placeholder='Mobile Number'
                            onChange={handleMobile}
                            name='mobile'
                            required
                            className={createStyles.input}
                        />
                        <select onChange={handleAccountType} className={createStyles.select}>
                            <option >admin</option>
                            <option >Raw material Manager</option>
                            <option >Production Manager</option>
                            <option >Stock Manager</option>
                            <option >Distribution Manager</option>
                            <option >Sales Rep</option>
                        </select>
                        <button type='submit' className={createStyles.greenBtn}>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateEmployee;