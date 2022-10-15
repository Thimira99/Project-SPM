import React, { Component } from 'react';

import { FaHome } from "react-icons/fa";
import { FaBoxes } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export const HomeSidebarData = [
    {
        title: "Dashboard",
        icon: <FaHome />,
        link: "#"
    },
    {
        title: "Employee Management",
        icon: <FaUsers />,
        link: "/employee"
    },
    {
        title: "Stock Management",
        icon: <FaBoxes />,
        link: "/stockManagement"
    },
    {
        title: "My Notes",
        icon: <FaStickyNote />,
        link: "/notes"
    },

]