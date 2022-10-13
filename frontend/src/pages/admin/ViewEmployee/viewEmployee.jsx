import React, { Component } from 'react';
import AccountCSS from './viewEmployee.module.scss';
import { BsTrashFill, BsFilterSquareFill } from 'react-icons/bs';
import { MDBDataTable } from 'mdbreact';
import { FaEdit } from 'react-icons/fa';
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { createHeader } from '../../../createHeader';
import UpdateEmployee from '../UpdateEmployee/updateEmployee';
import { toastMsg } from '../../../toast';

import PDF from 'react-to-pdf';

class viewEmployee extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: [],
			// userAttributes: []
		};

		this.getAllShops = this.getAllShops.bind(this);
	}

	UpdateEmployee(id) {
		this.props.history.push(`/updateUser/${id}`);
	}

	deleteEmployee(id) {
		axios.delete(`http://localhost:8000/deleteUser/${id}`);
		window.location.reload();
		toastMsg('Successfully Deleted');
	}

	componentDidMount() {
		this.getAllShops();
	}

	getAllShops() {
		//header
		const headers = createHeader();

		axios.get('http://localhost:8000/get', headers).then((res) => {
			this.setState({ user: res.data.all }, () => {
				const userAttributes = [];
				this.state.user.forEach((el) => {
					userAttributes.push({
						firstName: el.firstName,
						email: el.email,
						mobile: el.mobile,
						dateOfBirth: el.dateOfBirth,
						accountType: el.accountType,

						age: (
							<>
								<FaEdit
									style={{
										marginLeft: '15px',
										fontSize: '23px',
										cursor: 'pointer',
									}}
									onClick={() => this.UpdateEmployee(el._id)}
								/>
								<BsTrashFill
									style={{
										marginLeft: '15px',
										fontSize: '23px',
										cursor: 'pointer',
										marginLeft: '3rem',
									}}
									onClick={() => this.deleteEmployee(el._id)}
								/>
							</>
						),
					});
				});
				this.setState({
					data: {
						columns: [
							{
								label: 'NAME',
								field: 'firstName',
								sort: 'asc',
								width: 200,
							},
							{
								label: 'EMAIL',
								field: 'email',
								sort: 'asc',
								width: 250,
							},
							{
								label: 'MOBILE',
								field: 'mobile',
								sort: 'asc',
								width: 150,
							},

							{
								label: 'DATE OF BIRTH',
								field: 'dateOfBirth',
								sort: 'asc',
								width: 150,
							},

							{
								label: 'ACCOUNT TYPE',
								field: 'accountType',
								sort: 'asc',
								width: 150,
							},
							{
								label: 'ACTION ',
								field: 'age',
								sort: 'asc',
								width: 120,
							},
						],
						rows: userAttributes,
					},
				});
			});
		});
	}

	render() {
		const ref = React.createRef();

		return (
			<>
				<Navbar />

				<div className={AccountCSS.container} ref={ref}>
					<h1 style={{ marginLeft: '32rem' }}>View Employees</h1>
					<MDBDataTable
						style={{ whitespace: 'nowrap' }}
						scrollY
						maxHeight='1000px'
						loading={false}
						hover
						bordered
						word-wrap='breakword'
						whitespace='nowrap'
						textoverflow='ellipsis'
						data={this.state.data}
						className={AccountCSS.yourcustomstyles}
					/>

					{/* generate Pdf */}
					{/* <PDF targetRef={ref} filename='post.pdf' x={0.5} y={0.5} scale={0.7}>
						{({ toPdf }) => (
							<div>
								<button onClick={toPdf} className='btn btn-info'>
									Report
								</button>
							</div>
						)}
					</PDF> */}

					<button
						onClick={() => {
							this.props.history.push('/report');
						}}
						className='btn btn-info'
					>
						Report
					</button>
				</div>
			</>
		);
	}
}

export default viewEmployee;
