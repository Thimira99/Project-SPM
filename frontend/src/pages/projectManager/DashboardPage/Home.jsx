import Navbar from '../../../components/HomeNavBar'
import './Home.scss'
import Widget from '../Widgets/widget'
import React from 'react'

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        
<div className='homeContainer'>
<div className='widget'>
        <Widget type='user'/>
        <Widget type='stocks'/>
        <Widget type='orders'/>
        <Widget type='Revenue'/>

    </div>
    

</div>
    
    </div>
  )
}

export default Home