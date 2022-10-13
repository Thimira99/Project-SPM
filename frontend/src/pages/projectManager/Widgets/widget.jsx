import React from 'react'
import './widget.scss'
import {HiArrowCircleUp} from  "react-icons/hi";
import {BsPersonCircle} from "react-icons/bs"; 
import {FaBoxes} from 'react-icons/fa';
import {BiAddToQueue} from 'react-icons/bi';
import {MdAttachMoney} from 'react-icons/md';

const widget = ({type}) => {

  let data;

  //temporary
  const amount = 100;
  const diff = 20;
  
  switch(type){
    case "user":
      data={
        title:'USERS',
        isMoney:false,
        link:"View all users",
        icon:<BsPersonCircle className='icon'/>,
      }
      break;

      case "stocks":
      data={
        title:'STOCKS',
        isMoney:false,
        link:"View all stocks",
        icon:<FaBoxes className='icon'/>,
      }
      break;

      case "orders":
      data={
        title:'ORDERS',
        isMoney:false,
        link:"View all orders",
        icon:<BiAddToQueue className='icon'/>,
      }
      break;

      case "Revenue":
      data={
        title:'REVENUE',
        isMoney:true,
        link:"View net earnings",
        icon:<MdAttachMoney className='icon'/>,
      }
      break;

      default:
        break;
  }

  return (
    <div className='widget'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.isMoney && "$"}{}</span>
            <span className='link'>View all users</span>
            
        </div>

        <div className='right'>
            <div className='precentage positive'> <HiArrowCircleUp/> 20%</div>
            <BsPersonCircle className='icon'/>
        </div>
    </div>

  )
}

export default widget