import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router"; 
import StockNavbar from '../../components/Stock Management/StockNavBar';
import stockManagementStyles from './update.module.scss';
import {FaRegDotCircle} from "react-icons/fa";
//import toast msg
import { toastMsg } from '../../toast.js';

export default class updateReqStocks extends Component {

    constructor(props){
        super(props);
        this.state={
            ReqStockId: this.props.match.params.id,
            product_id:"",
            product_type:"",
            reqNoStocks:"",
            reqDate:"",
            DueDate:"",
            regPrice:"",
            reqStocks:[]
        }
    }

    handleInputChange=(e)=>{
        const {name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        })
    }

    handleTypeInputSelect = (e)=>{
        this.setState({product_type:e.target.value})
        console.log("handle type",e.target.value)
    }

    
    
    onSubmit=(e)=> {
        e.preventDefault();
        /** */
            const id = this.props.match.params.id;

            const {product_id, product_type, reqNoStocks, reqDate, DueDate, regPrice} = this.state;

            const data = {
                product_id: product_id,
                product_type: product_type,
                reqDate: reqDate,
                DueDate:DueDate,
                regPrice:regPrice,
                reqNoStocks: reqNoStocks,            
            }

            console.log(data);

            axios.put(`http://localhost:8000/update/request/stocks/${id}`, data).then((res) => {
                if (res.status==200) {
                    toastMsg("Request Details Updated Successfully!")
                    window.location.href='/reqStocks';
                    this.setState(
                        {
                            product_id: "",
                            product_type: "",
                            reqDate: "",
                            DueDate:"",
                            regPrice: "",
                            reqNoStocks:"",

                        }
                    )
                }
                console.log("updated data",data)
            })
        }

        updateData(){
            console.log("req stock id",this.state.ReqStockId)
            axios.get(`http://localhost:8000/retrieve/request/stock/${this.state.ReqStockId}`).then((res) =>{
                console.log("response",res);
                this.setState({
                    product_id: res.data.reqStock.product_id,
                    product_type: res.data.reqStock.product_type,
                    reqDate: res.data.reqStock.reqDate,
                    DueDate: res.data.reqStock.DueDate,
                    regPrice: res.data.reqStock.regPrice,
                    reqNoStocks: res.data.reqStock.reqNoStocks,
                    
                })
            });
        }

        componentDidMount(){
            this.updateData();
            this.retrieveProducts();                
    }

    onCancel(){
        window.location.href='/reqStocks';
    }     

    retrieveProducts(){
        axios.get("http://localhost:8000/product/get").then(res=>{
            if(res.status==200){
                this.setState({
                    reqStocks:res.data.existingProducts
                });
                console.log("products",this.state.reqStocks)
            }
        });
    }

    render() {
        return (
            <>
            <StockNavbar/>
                    <br/>
                    <h3 className={stockManagementStyles.heading}>STOCK REGISTRATION</h3>
                    {/* <hr style={{color:'black',"marginTop": "2px", "width": "1520px"}}/> */}
                    <br/>
                    <div className={stockManagementStyles.main}>
                    <br/>
                    
                    <div className='card' style={{
                        marginTop:'60px',
                        marginLeft:'-420px',
                        width:'900px',
                        height:'fitContent',
                        border:'none'
                    }}>
                        <form className='needs-validation' noValidate onSubmit={this.onSubmit} style={{
                            height:'auto'
                        }}>
                        <div class="row">
                            <div class="col-lg-5">
                            <h5 style={{
                                marginLeft:'30px',
                                marginTop:'40px'
                            }}><FaRegDotCircle/> &nbsp; Product Details</h5>
                            <br/>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'30px'
                                }}>
                                PRODUCT ID
                                </label>
                                <br/>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_id"
                                    placeholder="Enter product id"
                                    value={this.state.product_id}
                                    onChange={this.handleInputChange}
                                    required
                                    style={{marginLeft:'20px'}}
                                    readOnly
                                    />
                            </div>
                            </div>

                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <h5 style={{
                                marginLeft:'-30px',
                                marginTop:'40px'
                            }}><FaRegDotCircle/> &nbsp; Stock Details</h5>
                            <br/>
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                    }}>REQUESTED STOCKS
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="reqNoStocks"
                                    placeholder="Enter requested stocks"
                                    value={this.state.reqNoStocks}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'-30px'
                                    }}
                                    />
                                    
                            </div>
                            </div>
                            </div>
                            <br/>
                            <div class="row">
                            <div class="col-lg-5">
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'30px'
                                }}>PRODUCT TYPE
                                </label>
                                <br/>

                                <select id="product_type" onChange={this.handleTypeInputSelect} value={this.state.product_type} 
                                    className="btn btn-outline-secondary dropdown-toggle" 
                                    style={{marginLeft:'30px', width:'auto'}}>
                                    <option selected> {this.state.product_type}</option>
                                    {
                                        this.state.reqStocks.map((object) => (
                                        
                                            <option>{object.productType}</option>
                                        ))

                                    }

                                </select>
                            </div>
                            </div>
                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'-30px'
                                    }}>REGULAR PRICE
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="regPrice"
                                    placeholder="Enter regular price"
                                    value={this.state.regPrice}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'-30px'
                                    }}
                                    />
                                   
                            </div>
                            </div>
                            </div>

                            <br/>
                            <div class="row">
                            <div class="col-lg-5">
                            <div class="mb-3">
                            <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'30px'
                                    }}>REGISTERED DATE
                                </label>
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="reqDate"
                                    placeholder="Enter requested date"
                                    value={this.state.reqDate}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'20px'
                                    }}
                                    />
                                   
                            </div>
                            </div>   
                            </div>

                           
                            <div class="col-lg-5" style={{
                                marginLeft:'480px'
                            }}>
                            <div class="mb-3">
                            <br/>
                            
                            <button class="btn btn-outline-primary" type="submit" style={{
                                width:'auto',
                                height:'auto',
                                fontWeight:'600',
                                marginTop:'-150px',
                                marginLeft:'20px'
                                }} onClick={this.onSubmit}>
                            
                                &nbsp; Update &nbsp;
                            </button>

                            <button class="btn btn-outline-secondary" type="submit" 
                                style={{
                                marginLeft:'20px',
                                width:'auto',
                                fontWeight:'600',
                                marginTop:'-150px'
                                }}
                                onClick={this.onCancel}
                            >
                            &nbsp; Cancel &nbsp;    
                            </button>
                            </div>  
                            </div>
                                                      
                            <div className='row' style={{
                                marginTop:'-30px'
                            }}>
                            <div class="col-lg-5">
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'30px',
                                    }}>DUE DATE
                                </label>
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="DueDate"
                                    placeholder="Enter due date"
                                    value={this.state.DueDate}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'20px'
                                    }}
                                    />
                                    
                            </div>
                            </div>
                            </div>
                            
                        <br/>
                        </form>
                        </div>
                
    
                        
                    </div>
                    </>
        )
      }
}