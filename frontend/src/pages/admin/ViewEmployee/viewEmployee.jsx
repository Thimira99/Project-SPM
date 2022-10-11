import React, { Component } from 'react';
import AccountCSS from './viewEmployee.module.scss';
import { BsTrashFill, BsFilterSquareFill } from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import { FaEdit } from "react-icons/fa";
import Navbar from '../../../components/Navbar';
import axios from 'axios';
import { createHeader } from '../../../createHeader';

class viewEmployee extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: [],
            // userAttributes: []
        }

        this.getAllShops = this.getAllShops.bind(this);
    }


    componentDidMount() {

        this.getAllShops();
    }

    getAllShops() {

        //header
        const headers = createHeader();

        axios.get("http://localhost:8000/get", headers).then(res => {


            this.setState({ user: res.data.all }, () => {
                const userAttributes = [];
                this.state.user.forEach(el => {

                    userAttributes.push({
                        firstName: el.firstName,
                        email: el.email,
                        mobile: el.mobile,
                        dateOfBirth: el.dateOfBirth,
                        accountType: el.accountType,

                        age: <><FaEdit style={{ "marginLeft": "15px", "fontSize": "23px" }} /><BsTrashFill style={{ "marginLeft": "15px", "fontSize": "23px" }} /></>
                    })

                });
                this.setState({
                    data: {
                        columns: [
                            {
                                label: 'NAME',
                                field: 'firstName',
                                sort: 'asc',
                                width: 200,

                            },
                            {
                                label: 'EMAIL',
                                field: 'email',
                                sort: 'asc',
                                width: 250
                            },
                            {
                                label: 'MOBILE',
                                field: 'mobile',
                                sort: 'asc',
                                width: 150,

                            },

                            {
                                label: 'DATE OF BIRTH',
                                field: 'dateOfBirth',
                                sort: 'asc',
                                width: 150
                            },

                            {
                                label: 'ACCOUNT TYPE',
                                field: 'accountType',
                                sort: 'asc',
                                width: 150,
                            }
                            ,
                            {
                                label: 'ACTION ',
                                field: 'age',
                                sort: 'asc',
                                width: 120
                            }
                        ],
                        rows: userAttributes
                    }
                })
            })
        })
    }

    render() {
        return (
            <>
                <Navbar />

                <div className={AccountCSS.container}>

                    <h1 style={{ marginLeft: "32rem" }}>View Employees</h1>
                    <MDBDataTable


                        style={{ "whitespace": "nowrap", }}
                        scrollY
                        maxHeight="1000px"
                        loading={false}
                        hover
                        bordered
                        word-wrap="breakword"

                        whitespace="nowrap"
                        textoverflow="ellipsis"

                        data={this.state.data}
                        className={AccountCSS.yourcustomstyles}
                    />

                </div>


            </>
        );
    }
}

export default viewEmployee;