import React, { Component } from 'react';

import { FaHome } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import {FaRegFilePdf} from 'react-icons/fa';

export const StockSidebarData = [
    {
        title: "Dashboard",
        icon: <FaHome />,
        link: "/"
    },
    {
        title: "Inventory",
        icon: <FaShoppingCart />,
        link: "/stockManagement"
    },
    {
        title: "Requisitions",
        icon: <FaCartPlus />,
        link: "/reqStocks"
    },
    {
        title: "Create Stocks",
        icon: <FaPlusCircle />,
        link: "/createStocks"
    },
    {
        title: "Request Stocks",
        icon: <FaRegCalendarPlus />,
        link: "/createRequests"
    },
    {
        title: "Stock Report",
        icon: <FaRegFilePdf />,
        link: "/stockReport"
    },
    {
        title: "Requisitions Report",
        icon: <FaRegFilePdf />,
        link: "/createRequests"
    },
]