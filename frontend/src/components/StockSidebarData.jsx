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
        link: "#"
    },
    {
        title: "Create Stocks",
        icon: <FaPlusCircle />,
        link: "/"
    },
    {
        title: "Request Stocks",
        icon: <FaRegCalendarPlus />,
        link: "/"
    },
//     {
//         title: "Profile",
//         icon: <FaUserCircle />,
//         link: "/dashboard"
//     },
]