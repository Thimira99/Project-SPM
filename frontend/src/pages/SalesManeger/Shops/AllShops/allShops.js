import React, { Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
import { BsXLg ,BsTrashFill,BsFilterSquareFill} from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture ,FcFullTrash,FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

class allShops extends Component {

    constructor(props) {
        super(props)

        this.state = {

            allShops:[],

           
        }

        this.onAllShopSubmit = this.onAllShopSubmit.bind(this);
        this.getAllShops = this.getAllShops.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdateShop = this.onUpdateShop.bind(this);
    }

    onUpdateShop(id){

      
        this.props.history.push(`/updateShop/${id}`);

    }

    onCreate(){
        this.props.history.push('/createShop');
    }

    onAllShopSubmit() {

        this.props.history.push('/allShops');

    }

    getAllShops(){

        axios.get('http://localhost:8000/api/account/get').then((res) => {
            console.log("res data",res.data)
            if(res.data.code == "200"){
                this.setState({
                    allShops:res.data.data
                },()=>{



                    const userAttributes = []
                    this.state.allShops.forEach(el => {
              
                        userAttributes.push({
                            shopname: el.sh_Name,
                            ownername: el.name,
                            regnumber: el.sh_RegistrationNumber,
                            phonenumber: el.sh_phoneNumber,
                            region:el.sh_Region,
                            adress:el.sh_Address,

                            action: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}} onClick={() => this.onUpdateShop(el._id)}/></>
            
            
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
                    })


                })
            }
        })



 
    }

    componentDidMount() {

        this.getAllShops();
    }



    render() {
        return (
            <>
                <SalesRepDashboard />

                <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>


                    <Row>

                        <Col>

                            <Button style={{ "width": "110px", "fontWeight": "600","backgroundColor":"#0D4582" }} onClick={this.onAllShopSubmit}>ALL SHOPS</Button>


                        </Col>

                        <Col>

                            <Button style={{ "width": "110px", "fontWeight": "600" }} onClick={this.onCreate}>CREATE</Button>

                        </Col>
                    </Row>


                </div>
                <Row>

                    <div className={AccountCSS.container}>


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





                </Row>



            </>
        );
    }
}

export default allShops;