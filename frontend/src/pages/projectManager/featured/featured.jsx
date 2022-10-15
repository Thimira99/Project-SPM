import React from 'react'
import './featured.scss'
import {MdMoreVert} from 'react-icons/md'
import {CircularProgressbar} from 'react-circular-progressbar';
import {HiArrowCircleDown,HiArrowCircleUp} from 'react-icons/hi';
import 'react-circular-progressbar/dist/styles.css';
import {AiOutlineFileDone} from 'react-icons/ai';
import imageDone from '../../../images/done.gif';

const featured = () => {
  return (
    <div className='featured'>
      <div className='top'>
        <h1 className='title'>Total revenue</h1>
        <MdMoreVert fontSize='35px'/>
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
            <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
        </div>
        <p className='title'>Total Sales made</p>
        <p className='amount'><img src={imageDone} alt='' style={{width:'200px', marginLeft:'3.5px',marginTop:'10px'}}/></p>
        <p className='desc'>Previous transactions are processing</p>

        {/* <div className='summary'>
          <div className='item'>
            <div className='itemTitle'>Target</div>
            <div className='itemResult negative'>
              <HiArrowCircleDown fontSize='small'/>
              <div className='resultAmount'>$12.4</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>Last week</div>
            <div className='itemResult positive'>
              <HiArrowCircleUp fontSize='small'/>
              <div className='resultAmount'>$12.4</div>
            </div>
          </div>
          <div className='item'>
            <div className='itemTitle'>Last month</div>
            <div className='itemResult positive'>
              <HiArrowCircleUp fontSize='small'/>
              <div className='resultAmount'>$12.4</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default featured