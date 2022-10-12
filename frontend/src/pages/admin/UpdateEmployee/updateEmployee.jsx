import axios from 'axios';
import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { createHeader } from '../../../createHeader';
import { toastMsg } from '../../../toast';

import createStyles from './updateEmployee.module.scss';

function UpdateEmployee() {
	const history = useHistory();

	const { id } = useParams();

	//initialize user variables
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [mobile, setMobile] = useState('');
	const [accountType, setAccountType] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState(Boolean);

	//gte user details by id
	useEffect(() => {
		axios.get(`http://localhost:8000/getUserById/${id}`).then((res) => {
			setFirstName(res.data.data.firstName);
			setLastName(res.data.data.lastName);
			setEmail(res.data.data.email);
			setDateOfBirth(res.data.data.dateOfBirth);
			setMobile(res.data.data.mobile);
			setAccountType(res.data.data.accountType);
			setStatus(res.data.data.status);
		});
	}, []);

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
		setMobile(event.target.value);
	}

	function handleDateOfBirth(event) {
		setDateOfBirth(event.target.value);
	}

	function handleAccountType(event) {
		setAccountType(event.target.value);
	}

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	function handleStatus(event) {
		setStatus(event.target.value);
	}

	//submit
	function handleSubmit(e) {
		e.preventDefault();

		const data = {
			firstName,
			lastName,
			accountType,
			dateOfBirth,
			email,
			password,
			status,
			mobile,
		};

		axios
			.put(`http://localhost:8000/updateUser/${id}`, data)
			.then((res) => {
				toastMsg('Successfully Updated', 'info');
				history.push('/viewEmployee');
			})
			.catch((err) => {
				alert(err);
			});
	}

	return (
		<>
			<Navbar />

			<div className='main'>
				<form className={createStyles.form} onSubmit={handleSubmit}>
					<h1>Create Account</h1>
					<input
						type='text'
						placeholder='First Name'
						name='firstName'
						value={firstName}
						onChange={handleFirstName}
						required
						className={createStyles.input}
					/>
					<input
						type='text'
						placeholder='Last Name'
						name='lastName'
						value={lastName}
						onChange={handleLastName}
						required
						className={createStyles.input}
					/>
					<input
						type='email'
						placeholder='Email'
						value={email}
						onChange={handleEmail}
						name='email'
						required
						className={createStyles.input}
					/>
					<input
						type='date'
						placeholder='Date Of Birth'
						value={dateOfBirth}
						onChange={handleDateOfBirth}
						name='date'
						required
						className={createStyles.input}
					/>
					<input
						type='text'
						placeholder='Mobile Number'
						value={mobile}
						onChange={handleMobile}
						name='mobile'
						required
						className={createStyles.input}
					/>

					<select
						onChange={handleAccountType}
						value={accountType}
						className={createStyles.input}
					>
						<option>admin</option>
						<option>Raw material Manager</option>
						<option>Production Manager</option>
						<option>Stock Manager</option>
						<option>Distribution Manager</option>
						<option>Sales Rep</option>
					</select>

					<select
						value={status}
						onChange={handleStatus}
						required
						className={createStyles.input}
					>
						<option>Choose....</option>
						<option>true</option>
						<option>false</option>
					</select>

					<input
						type='password'
						placeholder='Enter a Password'
						onChange={handlePassword}
						name='password'
						required
						className={createStyles.input}
					/>

					<button type='submit' className={createStyles.greenBtn}>
						Create
					</button>
				</form>
			</div>
		</>
	);
}

export default UpdateEmployee;
