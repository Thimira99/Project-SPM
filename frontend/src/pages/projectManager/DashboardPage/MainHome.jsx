import Navbar from '../../../components/HomeNavBar'
import './Home.scss'
import Widget from '../Widgets/widget'
import Featured from '../featured/featured';
import Chart from '../chart/chart';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Home = () => {
  const [allStcoks,setAllStocks]=useState([]);
  const [allInvoices,setAllInvoices]=useState([]); 
  const [allOrders,setAllOrders]=useState([]); 

  function getStocks(){
    axios.get('http://localhost:8000/retrieve/stocks')
    .then((res)=>{
      setAllStocks(res.data.data)
      console.log('stocks',res.data.data)
     
      console.log('All stocks',allStcoks.length)
    })
  }

  function getInvoices(){
    axios.get('http://localhost:8000/api/Invoice/get')
    .then((res)=>{
      setAllInvoices(res.data.data)
      console.log('invoices',res.data.data)
     
      console.log('All invoices',allInvoices.length)
    })

    
  }

  function getOrders(){
    axios.get('http://localhost:8000/order/get')
    .then((res)=>{
      setAllOrders(res.data.existingOrders)
      console.log('orders',res.data.existingOrders)
     
      console.log('All orders',allOrders.length)
    })

    
  }

  useEffect(()=>{
    getStocks();
    getInvoices();
    getOrders();

  },[])


  return (
    <div className='home'>
        <Navbar/>
        
<div className='homeContainer'>
<div className='widget'>
        {/* <Widget type='user' /> */}
        <Widget type='stocks' value={allStcoks.length}/>
        <Widget type='orders' value={allOrders.length}/>
        <Widget type='Revenue' value={
          allInvoices.reduce((sum,invoice)=>invoice.TotalAmount+sum,0)}/>

    </div>

  <div className='charts'>
    <Featured/>
    <Chart/>
    
  </div>
    

</div>
    
    </div>
  )
}

export default Home