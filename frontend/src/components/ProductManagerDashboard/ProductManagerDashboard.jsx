import React from 'react';
import { Link } from 'react-router-dom';
import navbarStyles from '../Navbar.module.scss';


import { sidebarData } from './ProductManagerSideBarData';


function ProductManagerDashboard() {
    return (
        <>
            <div className={navbarStyles.mainSidebar}>
                {sidebarData.map((value) => (
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

export default ProductManagerDashboard;