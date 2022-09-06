import React, { Component } from 'react';
import HomeNavbar from '../../components/HomeNavBar';
import TopBar from '../../components/Topbar';

import HomeStyles from './Home.module.scss';

function Dashboard() {
    return (
        <>
            <TopBar />
            <div className={HomeStyles.main}>
                <HomeNavbar />
                <h1>Dashboard</h1>
            </div>
        </>
    )
}

export default Dashboard;