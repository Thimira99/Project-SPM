import React from 'react';

import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaElementor } from "react-icons/fa";
import { FaPeopleCarry } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaCodepen } from "react-icons/fa";
export const sidebarData = [
    {
        title: "Dashboard",
        icon: <FaHome />,
        link: "/productManager"
    },
    {
        title: "Purhcase Materials",
        icon: <FaShoppingCart />,
        link: "/createOrder"
    },
    {
        title: "Availability",
        icon: <FaElementor />,
        link: "/"
    },
    // {
    //     title: "Maintenance"
    // },
    {
        title: "Suppliers",
        icon: <FaPeopleCarry />,
        link: "/supplierList"
    },
    {
        title: "Materials",
        icon: <FaCodepen />,
        link: "/materialList"
    },
    {
        title: "Products",
        icon: <FaProductHunt />,
        link: "/productList"
    },
]