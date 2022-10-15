import React, { Component, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import navbarStyles from './Navbar.module.scss';
import { BsPerson } from "react-icons/bs";

function TopBar() {

    const [User, setUser] = useState('');

    useEffect(() => {
        //set user Details from local Stirage
       
        const newUser = localStorage.getItem('user');
        console.log("new user",newUser)
        if(newUser){
            const user = JSON.parse(newUser);
            setUser(user) 
        }
    

    }, []);


    
   
    return (
      
        <div className={navbarStyles.topBar} >
            <h1 >SNACKHACK<span>365</span></h1>


            <div className={navbarStyles.logout}>

                {User && <h6 style={{ "float": "left", "marginRight": "20px", "color": "white", "fontFamily": "sans-serif", "fontSize": "meduim", "marginTop": "8px" }}>{User.firstName} {User.lastName}<span style={{ "marginLeft": "5px", "marginBottom": "5px", "fontSize": "18px" }}><BsPerson /></span></h6>}
                <button className="btn btn-outline-primary" style={{ marginTop: '-8px', height: 'auto' }}><a href="/login" style={{
                    textDecoration: 'none',
                    color: 'white',

                }}>Logout</a></button>

            </div>

        </div>
    )
}

export default TopBar;