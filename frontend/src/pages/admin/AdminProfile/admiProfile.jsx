import React, { Component, useState } from 'react';
import Navbar from '../../../components/Navbar';

import profileLogo from '../../../images/Profile.png';

//import jwt decorder
import jwt from 'jwt-decode';

import style from './adminProfile.module.scss';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import { BsFillCheckSquareFill } from 'react-icons/bs';
import { FaCut } from 'react-icons/fa';

function AdminProfile() {
	const history = useHistory();

	//initialize user variables
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [mobile, setMobile] = useState('');
	const [accountType, setAccountType] = useState('');
	const [status, setStatus] = useState('');

	const user = localStorage.getItem('Token');
	const result = jwt(user);

	useEffect(() => {
		axios.get(`http://localhost:8000/getUserById/${result.id}`).then((res) => {
			setFirstName(res.data.data.firstName);
			setLastName(res.data.data.lastName);
			setEmail(res.data.data.email);
			setDateOfBirth(res.data.data.dateOfBirth);
			setMobile(res.data.data.mobile);
			setAccountType(res.data.data.accountType);
			setStatus(res.data.data.status);
		});
	}, []);

	return (
		<>
			<Navbar />
			<div className={style.main}>
				<div className={style.htag}>
					<h1>Admin Profile </h1>
				</div>
				<div className={style.mainCard}>
					<div class='card' style={{ width: '300px' }}>
						<img class='card-img-top' src={profileLogo} alt='Card image cap' />
						<div class='card-body'>
							<h5 class='card-title'>
								{firstName} {lastName}
							</h5>
							<h5>
								Email : <span>{email}</span>
							</h5>
							<h5>
								Date Of Birth : <span>{dateOfBirth}</span>
							</h5>
							<h5>
								Mobile : <span>{mobile}</span>
							</h5>
							<h5>
								Account Type : <span>{accountType}</span>
							</h5>
							<h5>
								Account Type : <span>{accountType}</span>
							</h5>
							<h5>
								Status :
								<span>
									{String(status) === 'true' ? (
										<BsFillCheckSquareFill />
									) : (
										<FaCut />
									)}
								</span>
							</h5>
							<button
								className='btn btn-primary'
								style={{ marginLeft: '5rem' }}
								onClick={() => history.push(`/updateUser/${result.id}`)}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminProfile;
