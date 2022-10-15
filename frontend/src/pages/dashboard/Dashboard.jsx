import React from 'react';
import Navbar from '../../components/Navbar';

import dashboardStyles from './Dashboard.module.scss';

import Home from '../projectManager/DashboardPage/Home';

function Dashboard() {
	return (
		<>
			<Navbar />
			<Home />
		</>
	);
}

export default Dashboard;
