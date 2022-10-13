import axios from 'axios';
import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import { createHeader } from '../../../createHeader';

import logo from '../../../images/logo.png';

import styles from './report.module.scss';

import PDF from 'react-to-pdf';

function Report() {
	//header
	const headers = createHeader();

	const ref = React.createRef();

	var today = new Date(),
		date =
			today.getFullYear() +
			'-' +
			(today.getMonth() + 1) +
			'-' +
			today.getDate();

	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8000/get', headers).then((res) => {
			setData(res.data.all);
		});
	}, []);

	return (
		<>
			<Navbar />

			<div className={styles.main} ref={ref}>
				<h1>Summary Report</h1>

				<img
					src={logo}
					alt=''
					style={{ width: '200px', marginLeft: '3.5px', marginTop: '10px' }}
				/>
				<table class='table'>
					<thead class='thead-dark'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>First Name</th>
							<th scope='col'>Last Name</th>
							<th scope='col'>Email</th>
							<th scope='col'>Mobile</th>
							<th scope='col'>Account Type</th>
						</tr>
					</thead>
					<tbody>
						{data.map((value, index) => (
							<tr>
								<th scope='row'>{++index}</th>
								<td>{value.firstName}</td>
								<td>{value.lastName}</td>
								<td>{value.email}</td>
								<td>{value.mobile}</td>
								<td>{value.accountType}</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className={styles.footer}>
					<div className={styles.left}>
						<h3>SNACKHACK 365</h3>
						<h6>Employee Summary Report</h6>
						<h6>{date}</h6>
					</div>
					<div className={styles.right}>
						<h5>....................</h5>
						<h6>Signature</h6>
						<h5>{date}</h5>
					</div>
				</div>
			</div>
			{/* generate Pdf */}
			<PDF targetRef={ref} filename='post.pdf'>
				{({ toPdf }) => (
					<div>
						<button
							onClick={toPdf}
							className='btn btn-info'
							style={{ marginLeft: '6rem', marginTop: '3rem' }}
						>
							Report
						</button>
					</div>
				)}
			</PDF>
		</>
	);
}

export default Report;
