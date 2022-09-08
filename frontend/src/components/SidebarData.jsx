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
        link: "/mainPage"
    },
    {
        title: "Create Employee",
        icon: <FaUserPlus />,
        link: "/createEmployee"
    },
    {
        title: "View Employee",
        icon: <FaUsers />,
        link: "/viewEmployee"
    },
    {
        title: "My Notes",
        icon: <FaStickyNote />,
        link: "/notes"
    },
    {
        title: "Profile",
        icon: <FaUserCircle />,
        link: "/dashboard"
    },
]