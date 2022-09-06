import React from 'react';
import Navbar from '../../components/Navbar';

import dashboardStyles from './Dashboard.module.scss';

function Dashboard() {
    return (
        <>
            <Navbar />
            <div>
                <h1>Dashboard</h1>
                <div className={dashboardStyles.main}>
                    <input type="text" placeholder='Enter' />
                </div>
            </div>

        </>
    )
}

export default Dashboard;