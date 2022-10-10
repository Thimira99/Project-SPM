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
import stockManagementStyles from './stockManagement.module.scss'


class stockManagement extends Component {

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

        this.onAllStocksSubmit = this.onAllStocksSubmit.bind(this);
        this.getAllStocks = this.getAllStocks.bind(this);
        // this.onClickDelete=this.onClickDelete.bind(this);
        
    }

    
    onAllStocksSubmit() {

        this.props.history.push('/stockManagement');

    }

    onClickUpdate(id){
        this.props.history.push(`/update/stock/${id}`);
    }

    onClickDelete(id){
        if (window.confirm("Do you want to remove this stock?")) {
            axios.delete(`http://localhost:8000/stocks/delete/${id}`).then((res) => {
              alert("Stock removed Successfully!");
              this.getAllStocks();
            });
          }
    }

    getAllStocks(){
        
            axios.get("http://localhost:8000/retrieve/stocks").then(res=>{
                if(res.status==200){
                    this.setState({
                        stocks:res.data.data
                    },()=>{
                        console.log("message",this.state.stocks)
                        const userAttributes = []
                        this.state.stocks.forEach(el => {
                            // el.bagageData.map(obj => {
                            //     bagageID = obj.bagageID,
                            //         serialNumber = obj.serialNumber
                            // }
                            // )
                
                            // const data = el.productCategory == 'tvSeries' ? el.productDetails + " EP" : el.productDetails + " Min"
                            userAttributes.push({
                                productid: el.product_id,
                                producttype: el.product_type,
                                productname: el.product_name,
                                regularprice: el.regular_price,
                                reg_date:el.reg_date,
                                stock_count:el.stock_count,
                                status: el.status,
                             
                              
                                // discription: el.status == 'Received' ? <FcCheckmark style={{"fontSize":"25px"}}/>: <FcCancel style={{"fontSize":"25px"}}/>,
                
                                age: <><FaEdit style={{"marginLeft":"15px","fontSize":"23px"}} onClick={()=> this.onClickUpdate(el._id)} />
                                
                                <BsTrashFill style={{"marginLeft":"15px","fontSize":"23px" }} onClick={()=> this.onClickDelete(el._id)} />
                                </>
                
                
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
                                        label: 'PRODUCT NAME',
                                        field: 'productname',
                                        sort: 'asc',
                                        width: 150,
                
                                    },
                
                                    {
                                        label: 'REGULAR PRICE',
                                        field: 'regularprice',
                                        sort: 'asc',
                                        width: 50
                                    },
                                  
                                    {
                                        label: 'STATUS',
                                        field: 'status',
                                        sort: 'asc',
                                        width: 50,
                                    }
                                    ,
                                    {
                                        label: 'STOCK COUNT',
                                        field: 'stock_count',
                                        sort: 'asc',
                                        width: 50,
                                    }
                                    ,
                                    {
                                        label: 'REGISTERED DATE',
                                        field: 'reg_date',
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


    componentDidMount() {

        this.getAllStocks();
    }


    render() {
        return (
            <>
                <StockNavbar />
                
                <div style={{ "marginLeft": "40px", "marginTop": "30px", "flex": "none" }}>


                    <Row>
                    <h3 style={{color: "#287BD4"}}>STOCK REVIEW </h3> &nbsp;
                    
                    </Row>

                </div>
                <Row>
            
                    <div className={AccountCSS.container} style={{
                      marginLeft:'-180px'
                    }}>
                    <br/>
                        <MDBDataTable


                            style={{ "whitespace": "nowrap", }}
                            scrollY
                            maxHeight="1200px"
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

export default stockManagement;