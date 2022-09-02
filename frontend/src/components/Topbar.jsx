import React, { Component } from 'react';
import navbarStyles from './Navbar.module.scss';

function TopBar() {
    return (
        <div className={navbarStyles.topBar} >
            <h1 >SNACKHACK<span>365</span></h1>
            <div className={navbarStyles.logout}>
                <button>Logout</button>
            </div>

        </div>
    )
}

export default TopBar;