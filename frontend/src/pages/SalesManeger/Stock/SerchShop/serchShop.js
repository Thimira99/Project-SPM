import React, { Component, useState, CSSProperties } from 'react';
import { MDBDataTable } from 'mdbreact';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";
import loader from '../../../../components/Loader/loader';
import Swal from 'sweetalert2'


// const override: CSSProperties = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

class serchShop extends Component {

    constructor(props) {
        super(props)

        this.state = {

            shopName: '',
            shopRegNumber: '',
            ownerName: '',
            shopRegion: '',
            allShops: [],
            color: "#36d7b7",
            loading: false,
            override: {
                display: "block",
                margin: "0 auto",
                borderColor: "red",
            },
            dataSet: false

        }


        this.changeOwnerName = this.changeOwnerName.bind(this);
        this.changeShopName = this.changeShopName.bind(this);
        this.changeShopRegNumber = this.changeShopRegNumber.bind(this);
        this.changeShopRegion = this.changeShopRegion.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.setDataForTable = this.setDataForTable.bind(this);
        this.onSelectRow = this.onSelectRow.bind(this);

    }

    onSelectRow(id) {
        this.props.history.push(`/StockForShop/${id}`);
    }

    setDataForTable() {


        const userAttributes = []

        if (this.state.allShops) {


            this.state.allShops.forEach(el => {

                userAttributes.push({
                    shopname: <div onClick={() => this.onSelectRow(el._id)}>{el.sh_Name}</div>,
                    ownername: <div onClick={() => this.onSelectRow(el._id)}>{el.name}</div>,
                    regnumber: <div onClick={() => this.onSelectRow(el._id)}>{el.sh_RegistrationNumber}</div>,
                    phonenumber: <div onClick={() => this.onSelectRow(el._id)}>{el.sh_phoneNumber}</div>,
                    region: <div onClick={() => this.onSelectRow(el._id)}>{el.sh_Region}</div>,
                    adress: <div onClick={() => this.onSelectRow(el._id)}>{el.sh_Address}</div>,

                    action: <><FaEdit style={{ "marginLeft": "15px", "fontSize": "23px" }} onClick={() => this.onSelectRow(el._id)} /></>


                })
            });

            this.setState({
                data: {
                    columns: [
                        {
                            label: 'SHOP NAME',
                            field: 'shopname',
                            sort: 'asc',
                            width: 200,

                        },
                        {
                            label: 'OWNER NAME',
                            field: 'ownername',
                            sort: 'asc',
                            width: 200
                        },
                        {
                            label: 'REG NUMBER',
                            field: 'regnumber',
                            sort: 'asc',
                            width: 100,

                        },

                        {
                            label: 'PHONE NUMBER',
                            field: 'phonenumber',
                            sort: 'asc',
                            width: 100
                        },

                        {
                            label: 'REGION',
                            field: 'region',
                            sort: 'asc',
                            width: 100,


                        },
                        {
                            label: 'ADDRESS',
                            field: 'adress',
                            sort: 'asc',
                            width: 150,


                        }
                        ,
                        {
                            label: 'ACTION ',
                            field: 'action',
                            sort: 'asc',
                            width: 50
                        }
                    ],
                    rows: userAttributes
                }
            }, () => {
                this.setState({
                    loading: false
                })
            })
        }


    }

    onSearch() {


        if (this.state.shopRegion) {

            this.setState({
                loading: true
            })

            const data = {
                "sh_Name": this.state.shopName,
                "name": this.state.ownerName,
                "sh_RegistrationNumber": this.state.shopRegNumber,
                "sh_Region": this.state.shopRegion
            }

            const url = 'http://localhost:8000/api/account/search/post';

            axios.post(url, data).then((res) => {
                console.log(res.data)
                if (res.data.code == "200") {
                    this.setState({
                        allShops: res.data.data,
                        dataSet: true
                    }, () => {
                        this.setDataForTable();
                    })
                } else {
                    console.log("inside else")
                    this.setState({
                        loading: false
                    }, () => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'Network Error',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                }
            })

        } else {

            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Region Cant be Empty',
                showConfirmButton: false,
                timer: 1500
            })

        }



    }


    changeShopRegion = (event) => {
        this.setState({
            shopRegion: event.target.value
        })
    }

    changeOwnerName = (event) => {
        this.setState({
            ownerName: event.target.value
        })
    }

    changeShopRegNumber = (event) => {
        this.setState({
            shopRegNumber: event.target.value
        })
    }

    changeShopName = (event) => {
        this.setState({
            shopName: event.target.value
        })
    }


    render() {
        return (

            <>
                <SalesRepDashboard />



                <Row>

                    <div className={AccountCSS.container}>

                        <div style={{ "margin": "35px" }}>

                            <Row>

                                <Col>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Shop Name</span></Form.Label>
                                        <Form.Control type="text" value={this.state.shopName} onChange={this.changeShopName} name="shopName" />

                                    </Form.Group>

                                </Col>


                                {/* 
                                <Col style={{ "marginLeft": "25px" }}>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Name</span></Form.Label>
                                        <Form.Control type="text" value={this.state.ownerName} onChange={this.changeOwnerName} name="ownerName" />

                                    </Form.Group>

                                </Col> */}

                                <Col style={{ "marginLeft": "25px" }}>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Registration Number</span></Form.Label>
                                        <Form.Control type="text" value={this.state.shopRegNumber} onChange={this.changeShopRegNumber} name="shopRegNumber" />


                                    </Form.Group>

                                </Col>

                                <Col style={{ "marginLeft": "25px" }}>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label><span style={{ "fontFamily": "sans-serif" }}>Region</span><span style={{ "color": "#fe0017" }}>*</span></Form.Label>
                                        <Form.Control type="text" value={this.state.shopRegion} onChange={this.changeShopRegion} name="shopRegion" />

                                    </Form.Group>

                                </Col>

                            </Row>
                        </div>

                        <div style={{ "float": "right", "marginRight": "30px" }}>
                            <Button style={{ "width": "110px", "fontWeight": "600", "marginRight": "15px" }} onClick={this.onSearch}>SEARCH</Button>

                            <Button style={{ "width": "110px", "fontWeight": "600" }} onClick={this.onAllShopSubmit}>CLEAR</Button>

                        </div>



                    </div>





                </Row>


                <div

                    className={AccountCSS.tableContainer}>
                    {this.state.dataSet &&

                        <div style={{ "margin": "30px" }}>

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
                    }





                </div>


                {/* <div className="sweet-loading">
                <ClipLoader color={this.state.color} loading={this.state.loading} cssOverride={this.state.override} size={150} />

                </div> */}

                {this.state.loading &&

                    <>
                        <div className={AccountCSS.loardercontainer}>
                        </div>
                        <div style={{ "marginRight": "850px", "marginTop": "330px" }}>


                            <HashLoader
                                sizeUnit={"px"}
                                size={130}
                                color={"#123abc"}
                                loading={this.state.loading}
                            />

                        </div></>
                }


            </>
        );
    }
}

export default serchShop;