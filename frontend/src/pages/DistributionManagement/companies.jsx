import React, { Component } from 'react';
import DistributionNavbar from '../../components/Distribution Management/distributionNavBar';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
import { BsXLg ,BsTrashFill,BsFilterSquareFill} from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture ,FcFullTrash,FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';

class companies extends Component {

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

        this.onAllCompanies = this.onAllCompanies.bind(this);
        this.getAllCompanies = this.getAllCompanies.bind(this);
        this.edit=this.edit.bind(this);
        this.delete=this.delete.bind(this);
    }

    edit(){
        console.log("edit")
    }

    
    onAllCompanies() {

        this.props.history.push('/companies');

    }

    getAllCompanies(){
        
            axios.get("http://localhost:8000/retrieve/companies").then(res=>{
                if(res.status==200){
                    this.setState({
                        companies:res.data.data
                    },()=>{
                        console.log("message",this.state.companies)
                        const userAttributes = []
                        this.state.companies.forEach(el => {
                            // el.bagageData.map(obj => {
                            //     bagageID = obj.bagageID,
                            //         serialNumber = obj.serialNumber
                            // }
                            // )
                
                            // const data = el.productCategory == 'tvSeries' ? el.productDetails + " EP" : el.productDetails + " Min"
                            userAttributes.push({
                                regid: el.reg_id,
                                companyname: el.company_name,
                                address: el.company_address,
                                regdate: el.regDate,
                                
                            })
                        });
                
                        this.setState({
                            data: {
                                columns: [
                                    {
                                        label: 'COMPANY ID',
                                        field: 'regid',
                                        sort: 'asc',
                                        width: 100,
                
                                    },
                                    {
                                        label: 'COMPANY NAME',
                                        field: 'companyname',
                                        sort: 'asc',
                                        width: 100
                                    },
                                    {
                                        label: 'ADDRESS',
                                        field: 'address',
                                        sort: 'asc',
                                        width: 110,
                
                                    },
                
                                    {
                                        label: 'REGISTERED DATE',
                                        field: 'regdate',
                                        sort: 'asc',
                                        width: 100
                                    }
                                    
                                ],
                                rows: userAttributes
                            }
                        })
        
        });
                    
        }
    });
}

delete(id){
    if (window.confirm("Do you want to remove this company?")) {
        axios.delete(`http://localhost:8000/distribution/delete/${id}`).then((res) => {
          alert("Company removed Successfully!");
          this.getAllCompanies();
        });
      }
}
    componentDidMount() {

        this.getAllCompanies();
    }


    render() {
        return (
            <>
                <DistributionNavbar />

                <div style={{ "marginLeft": "60px", "marginTop": "30px", "flex": "none" }}>


                    
                    <Row>
                    <h3 style={{color: "#287BD4"}}>COMPANIES</h3>
                   </Row>


                </div>
                <Row>

                    <div className={AccountCSS.container} style={{
                      marginLeft:'-180px'
                    }}>


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

export default companies;