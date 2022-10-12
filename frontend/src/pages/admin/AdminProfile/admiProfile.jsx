import React, { Component } from 'react';
import Navbar from '../../../components/Navbar';

import profileLogo from '../../../images/Profile.png';

//import jwt decorder
import jwt from 'jwt-decode';

import style from './adminProfile.module.scss';

function AdminProfile() {
	const user = localStorage.getItem('Token');
	const result = jwt(user);

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
								{result.firstName} {result.lastName}
							</h5>
							<h5>
								Date Of Birth : <span>{result.dateOfBirth}</span>
							</h5>
							<h5>
								Mobile : <span>{result.mobile}</span>
							</h5>
							<h5>
								Account Type : <span>{result.accountType}</span>
							</h5>
							<h5>
								Account Type : <span>{result.accountType}</span>
							</h5>
							<button>Update</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminProfile;
