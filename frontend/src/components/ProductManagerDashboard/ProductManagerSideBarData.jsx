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
        link: "/productManager"
    },
    {
        title: "Purhcase Materials",
        icon: <FaUserPlus />,
        link: "/purchaseMaterials"
    },
    {
        title: "Availability",
        icon: <FaUsers />,
        link: "/viewEmployee"
    },
    // {
    //     title: "Maintenance"
    // },
    {
        title: "Supplier List",
        icon: <FaStickyNote />,
        link: "/supplierList"
    },
    {
        title: "Material List",
        icon: <FaUserCircle />,
        link: "/materialList"
    },
]