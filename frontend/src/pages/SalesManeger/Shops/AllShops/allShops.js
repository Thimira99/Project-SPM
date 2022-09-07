import React, { Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
import { BsXLg ,BsTrashFill,BsFilterSquareFill} from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture ,FcFullTrash,FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";

class allShops extends Component {

    constructor(props) {
        super(props)

        this.state = {

            testData:[{
                "dateCreated":"2022-01-03 22.03",
                "orderCode":"ORD101",
                "supplier":"SUP103",
                "totalCost":"2300",
                "status":"Received"
            },{
                "dateCreated":"2022-02-11 12.03",
                "orderCode":"ORD102",
                "supplier":"SUP303",
                "totalCost":"2300",
                "status":"Received"
            },{
                "dateCreated":"2022-02-15 12.07",
                "orderCode":"ORD105",
                "supplier":"SUP107",
                "totalCost":"2050",
                "status":"Pending"
            },{
                "dateCreated":"2022-03-13 08.03",
                "orderCode":"ORD501",
                "supplier":"SUP503",
                "totalCost":"1240",
                "status":"Received"
            },{
                "dateCreated":"2022-03-15 14.03",
                "orderCode":"ORD121",
                "supplier":"SUP123",
                "totalCost":"1200",
                "status":"Received"
            },{
                "dateCreated":"2022-04-01 06.09",
                "orderCode":"ORD141",
                "supplier":"SUP105",
                "totalCost":"2000",
                "status":"Received"
            },{
                "dateCreated":"2021-04-17 16.35",
                "orderCode":"ORD142",
                "supplier":"SUP106",
                "totalCost":"2000",
                "status":"Received"
            },{
                "dateCreated":"2021-05-01 12.03",
                "orderCode":"ORD143",
                "supplier":"SUP107",
                "totalCost":"2300",
                "status":"Received"
            },{
                "dateCreated":"2022-07-03 16.53",
                "orderCode":"ORD144",
                "supplier":"SUP108",
                "totalCost":"2000",
                "status":"Pending"
            },{
                "dateCreated":"2022-08-03 12.03",
                "orderCode":"ORD145",
                "supplier":"SUP109",
                "totalCost":"2000",
                "status":"Pending"
            }]
        }

        this.onAllShopSubmit = this.onAllShopSubmit.bind(this);
        this.getAllShops = this.getAllShops.bind(this);
    }

    onAllShopSubmit() {

        this.props.history.push('/allShops');

    }

    getAllShops(){

        const userAttributes = []
        this.state.testData.forEach(el => {
            // el.bagageData.map(obj => {
            //     bagageID = obj.bagageID,
            //         serialNumber = obj.serialNumber
            // }
            // )

            // const data = el.productCategory == 'tvSeries' ? el.productDetails + " EP" : el.productDetails + " Min"
            userAttributes.push({
                companyname: el.dateCreated,
                productname: el.orderCode,
                detail: el.totalCost,
                Baggageid: el.supplier,
             
              
                discription: el.status == 'Received' ? <FcCheckmark style={{"fontSize":"25px"}}/>: <FcCancel style={{"fontSize":"25px"}}/>,

                age: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}}/><BsFilterSquareFill style={{"marginLeft":"15px","fontSize":"23px"}} /><BsTrashFill style={{"marginLeft":"15px","fontSize":"23px"}}/></>


            })
        });

        this.setState({
            data: {
                columns: [
                    {
                        label: 'CREATED DATE',
                        field: 'companyname',
                        sort: 'asc',
                        width: 200,

                    },
                    {
                        label: 'ORDER CODE',
                        field: 'productname',
                        sort: 'asc',
                        width: 250
                    },
                    {
                        label: 'SUPPLIER',
                        field: 'Baggageid',
                        sort: 'asc',
                        width: 150,

                    },

                    {
                        label: 'TOTAL COST',
                        field: 'detail',
                        sort: 'asc',
                        width: 150
                    },
                  
                    {
                        label: 'STATUS',
                        field: 'discription',
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

                            <Button style={{ "width": "110px", "fontWeight": "600" }} onClick={this.onAllShopSubmit}>ALL SHOPS</Button>


                        </Col>

                        <Col>

                            <Button style={{ "width": "110px", "fontWeight": "600" }}>CREATE</Button>

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