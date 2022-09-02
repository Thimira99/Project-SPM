import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import TopBar from '../../components/Topbar';

import dashboardStyles from './Dashboard.module.scss';

function Dashboard() {
    return (
        <>
            <TopBar />
            <div className={dashboardStyles.main}>
                <Navbar />
                <h1>Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard;