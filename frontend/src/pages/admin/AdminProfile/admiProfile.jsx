
import React, { Component } from 'react';
import Navbar from '../../../components/Navbar';

import profileLogo from '../../../images/Profile.png';

//import jwt decorder
import jwt from 'jwt-decode';

import style from './adminProfile.module.scss';

function AdminProfile(){

  const user = localStorage.getItem('Token');
  const result = jwt(user)


  return(
    <>
  
    <Navbar />
    <div className={style.main}>
        <div className={style.htag}> 
          <h1 >Admin Profile </h1>

        </div>
        <div className={style.mainCard}>
          <div class="card" style={{width:'300px'}}>
            <img class="card-img-top" src={profileLogo} alt="Card image cap"/>
            <div class="card-body">
              <h5 class="card-title">{result.firstName} {result.lastName}</h5>
              <h5>Date Of Birth : {result.dateOfBirth}</h5>
              <h5>Mobile : {result.mobile}</h5>
              <h5>Account Type : {result.accountType}</h5>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        
      </div>
  </>
  )
}

export default AdminProfile;