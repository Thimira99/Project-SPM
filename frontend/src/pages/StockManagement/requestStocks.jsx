import React, { Component } from 'react';
import StockNavbar from '../../components/Stock Management/StockNavBar';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";
import { BsXLg ,BsTrashFill,BsFilterSquareFill} from "react-icons/bs";
import { MDBDataTable } from 'mdbreact';
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture ,FcFullTrash,FcViewDetails } from "react-icons/fc";
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2'

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

        this.onAllReqStocks = this.onAllReqStocks.bind(this);
        this.getAllReqStocks = this.getAllReqStocks.bind(this);
        this.onClickUpdate=this.onClickUpdate.bind(this);
        this.delete=this.delete.bind(this);
    }

    

    
    onAllReqStocks() {

        this.props.history.push('/stockManagement');

    }

    getAllReqStocks(){
        
            axios.get("http://localhost:8000/retrieve/request/stocks").then(res=>{
                if(res.status==200){
                    this.setState({
                        reqStocks:res.data.data
                    },()=>{
                        console.log("message",this.state.reqStocks)
                        const userAttributes = []
                        this.state.reqStocks.forEach(el => {
                            // el.bagageData.map(obj => {
                            //     bagageID = obj.bagageID,
                            //         serialNumber = obj.serialNumber
                            // }
                            // )
                
                            // const data = el.productCategory == 'tvSeries' ? el.productDetails + " EP" : el.productDetails + " Min"
                            userAttributes.push({
                                productid: el.product_id,
                                producttype: el.product_type,
                                reqStocks: el.reqNoStocks,
                                reqdate: el.reqDate,
                                duedate: el.DueDate,
                                regprice:el.regPrice,
                              
                                // discription: el.status == 'Received' ? <FcCheckmark style={{"fontSize":"25px"}}/>: <FcCancel style={{"fontSize":"25px"}}/>,
                
                                age: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickUpdate(el._id)}/>
                               <BsTrashFill style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.delete(el._id)}/></>
                
                
                            })
                        });
                
                        this.setState({
                            data: {
                                columns: [
                                    {
                                        label: 'PRODUCT ID',
                                        field: 'productid',
                                        sort: 'asc',
                                        width: 100,
                
                                    },
                                    {
                                        label: 'PRODUCT TYPE',
                                        field: 'producttype',
                                        sort: 'asc',
                                        width: 100
                                    },
                                    {
                                        label: 'REQUIRED STOCKS',
                                        field: 'reqStocks',
                                        sort: 'asc',
                                        width: 110,
                
                                    },
                
                                    {
                                        label: 'REGISTERED DATE',
                                        field: 'reqdate',
                                        sort: 'asc',
                                        width: 100
                                    },
                                  
                                    {
                                        label: 'DUE DATE',
                                        field: 'duedate',
                                        sort: 'asc',
                                        width: 100,
                                    }
                                    ,
                                    {
                                        label: 'REGULAR PRICE',
                                        field: 'regprice',
                                        sort: 'asc',
                                        width: 100,
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
        
        });
                    
        }
    });
}

onClickUpdate(id){
    this.props.history.push(`/update/request/stocks/${id}`);
}

delete(id){
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            axios.delete(`http://localhost:8000/request/stocks/delete/${id}`).then((res) => {
            Swal.fire("Request removed Successfully!");
            this.getAllReqStocks();
        });
        //   Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    // if (window.confirm("Do you want to remove this stock?")) {
    //     axios.delete(`http://localhost:8000/request/stocks/delete/${id}`).then((res) => {
    //       alert("Request removed Successfully!");
    //       this.getAllReqStocks();
    //     });
    //   }
}
    componentDidMount() {

        this.getAllReqStocks();
    }


    render() {
        return (
            <>
                <StockNavbar />

                <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>


                    
                    <Row>
                    <h3 style={{color: "#287BD4"}}>REQUISITIONS</h3>
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

export default allShops;