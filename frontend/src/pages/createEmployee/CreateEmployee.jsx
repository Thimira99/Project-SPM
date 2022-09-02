import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import TopBar from '../../components/Topbar';
import CreateEmployeeStyles from './CreateEmployee.module.scss';

function CreateEmployee() {
    return (
        <>
            <TopBar />
            <div className={CreateEmployeeStyles.main}>
                <Navbar />
                <h1>Create Employee</h1>
            </div>
        </>
    )
}

export default CreateEmployee;