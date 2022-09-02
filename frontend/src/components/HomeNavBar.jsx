import React from 'react';
import { Link } from 'react-router-dom';
import navbarStyles from './Navbar.module.scss';

import { HomeSidebarData } from './HomeSidebarData';


function HomeNavBar() {
    return (
        <>
            <div className={navbarStyles.mainSidebar}>
                {HomeSidebarData.map((value) => (
                    <>
                        <div className={navbarStyles.sidebar}>
                            <li style={{ listStyleType: 'none' }} >
                                <ul style={{ listStyleType: 'none' }} >
                                    <Link to={value.link} style={{ color: 'white', textDecoration: 'none' }}>
                                        <div className={navbarStyles.mainRow}>
                                            <div className={navbarStyles.icon}>
                                                {value.icon}
                                            </div>
                                            <div className={navbarStyles.title}>
                                                {value.title}
                                            </div>
                                        </div>


                                    </Link>
                                </ul>
                            </li>


                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default HomeNavBar;