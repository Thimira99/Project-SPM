import './widget.scss'
import {HiArrowCircleUp} from  "react-icons/hi";
import {BsPersonCircle} from "react-icons/bs"; 
import {FaBoxes} from 'react-icons/fa';
import {BiAddToQueue} from 'react-icons/bi';
import {MdAttachMoney} from 'react-icons/md';


const widget = ({type,value}) => {


  let data;

  //temporary
  const amount = 100;
  const diff = 20;
  
  switch(type){
    case "user":
      data={
        title:'USERS',
        isMoney:false,
        link:"All users",
        icon:<BsPersonCircle className='icon' style={{
          // backgroundColor:'rgba(40, 67, 135,0.8)',
          color:'rgba(40, 67, 135,0.8)'
        }}

        />,
      }
      break;

      case "stocks":
      data={
        title:'STOCKS',
        // isMoney:false,
        link:"All stocks",
        icon:<FaBoxes className='icon'
          style={{
            color:'rgba(40, 67, 135,0.8)'
          }}
        />,
      }
      break;

      case "orders":
      data={
        title:'ORDERS',
        isMoney:false,
        link:"All orders",
        icon:<BiAddToQueue className='icon'
          style={{
            color:'rgba(40, 67, 135,0.8)'
          }}
        />,
      }
      break;

      case "Revenue":
      data={
        title:'REVENUE (Rs) ',
        // isMoney:true,
        link:"Income",
        icon:<MdAttachMoney className='icon'
          style={{
            color:'rgba(40, 67, 135,0.8)'
          }}
        />,
      }
      break;

      default:
        break;
  }

  return (
    
    <div className='widget'>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{value>1000?
              value.substring(0,5)+'+': value 
            }</span>
            <span className='link'>{data.link}</span>
            
        </div>

        <div className='right'>
            <div className='precentage positive'> <HiArrowCircleUp/> {diff}%</div>
            {data.icon}
        </div>
    </div>

  )
}

export default widget