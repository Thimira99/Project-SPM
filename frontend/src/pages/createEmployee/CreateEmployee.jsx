import React from 'react';
import Navbar from '../../components/Navbar';

function CreateEmployee() {
    return (
        <>
            <Navbar />

            <div>
                <h1>Create Employee</h1>
                <button className='btn btn-primary'>
                    Hello
                </button>
                <a href='/testPage'>TEST</a>
            </div>
        </>
    )
}

export default CreateEmployee;