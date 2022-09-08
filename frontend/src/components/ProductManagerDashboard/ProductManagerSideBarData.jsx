import React from 'react';

import { FaHome } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export const sidebarData = [
    {
        title: "Dashboard",
        icon: <FaHome />,
        link: "/salesPerson"
    },
    {
        title: "Shops",
        icon: <FaUserPlus />,
        link: "/createShop"
    },
    {
        title: "Stock",
        icon: <FaUsers />,
        link: "/viewEmployee"
    },
    {
        title: "Profile",
        icon: <FaStickyNote />,
        link: "/dashboard"
    },
    {
        title: "Profile",
        icon: <FaUserCircle />,
        link: "/dashboard"
    },
]