import React, { Component } from 'react';

import { FaHome } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa";
import { BiHighlight } from "react-icons/bi";
import { BiArchiveOut } from "react-icons/bi";
import { HiOutlineViewGridAdd } from "react-icons/hi"
import { BiBuildings } from "react-icons/bi"

export const ditributionSideBarData = [
    {
        title: "Dashboard",
        icon: <FaHome />,
        link: "/"
    },
    {
        title: "Distributions",
        icon: <BiArchiveOut />,
        link: "#"
    },
    {
        title: "Request Stocks",
        icon: <FaRegCalendarPlus />,
        link: "/requestedStocks"
    },
    {
        title: "Companies",
        icon: <BiBuildings />,
        link: "/companies"
    },
    {
        title: "Create Distributions",
        icon: <BiHighlight />,
        link: "/regDistributions"
    },
    {
        title: "Add Companies",
        icon: <HiOutlineViewGridAdd />,
        link: "/regCompany"
    }
    
]