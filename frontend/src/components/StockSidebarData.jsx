import React, { Component } from 'react';

import { FaHome } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
//import { FaUserCircle } from "react-icons/fa";

export const StockSidebarData = [
    {
        title: "Dashboard",
        icon: <FaHome />,
        link: "/"
    },
    {
        title: "Shop",
        icon: <FaShoppingCart />,
        link: "/stockManagement"
    },
    {
        title: "Create Stocks",
        icon: <FaPlusCircle />,
        link: "/createStocks"
    },
    {
        title: "Request Stocks",
        icon: <FaRegCalendarPlus />,
        link: "/reqStocks"
    },
//     {
//         title: "Profile",
//         icon: <FaUserCircle />,
//         link: "/dashboard"
//     },
]