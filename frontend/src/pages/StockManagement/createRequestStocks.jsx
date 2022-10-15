import React, { Component } from 'react';
import StockNavbar from '../../components/Stock Management/StockNavBar';
import axios from 'axios';
import stockManagementStyles from './createStocks.module.scss'
import {FaRegDotCircle} from "react-icons/fa";
import { toastMsg } from '../../toast.js';

export default class createRequestStocks extends Component{

    constructor(props){
        super(props);

        this.state={
            // ReqStockId: this.props.match.params.id,
            product_id:"",
            product_type:"",
            reqNoStocks:"",
            reqDate:"",
            DueDate:"",
            regPrice:"",
            reqStocks:[],

               /** */
        errorId:{},
        errorType:{},
        errorReqStocks:{},
        errorReqDate:{},
        errorDate:{},
        errorRegPrice:{}

        };
        this.handleInputSelect=this.handleInputSelect.bind(this);
        this.handleIdInputSelect=this.handleIdInputSelect.bind(this);
        this.handleTypeInputSelect=this.handleTypeInputSelect.bind(this)
        
    }

    handleInputChange=(e)=>{
        console.log("messgae",e)
        const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      }) 
  }
  
  handleInputSelect=(e)=>{
    this.setState({status:e.target.value})
    console.log("handle",e.target.value)
}

// handleValueInput=(e)=>{
//     const selectedValue = this.state.reqStocks.find(product=>product.product_id==e.target.value);
//     this.setState({ ...this.state,regPrice:selectedValue.price})
// }

handleIdInputSelect=(e)=>{
    this.setState({product_id:e.target.value})
    console.log("handle id",e.target.value)
}

handleTypeInputSelect = (e)=>{
    this.setState({product_type:e.target.value})
    console.log("handle type",e.target.value)
}


formValidation = () =>{
    const{reqNoStocks, reqDate, DueDate, regPrice}=this.state;
    let isValid = true;
    
    const errorReqStocks ={};
    const errorReqDate ={};
    const errorDate = {};
    const errorRegPrice ={};

  
    if(!DueDate){
        errorDate["dateInput"]="Due date Field is EMPTY!";
        isValid=false;
    }

    if(!reqDate){
        errorReqDate["reqDateInput"]="Requested date Field is EMPTY!";
        isValid=false;
    }

    if(!regPrice){
        errorRegPrice["priceError"]="Price Field is EMPTY!";
        isValid=false;
    }

    if(!regPrice.match(/^[0-9]*$/)){
        errorRegPrice["priceError"] = "Price can contain numbers Only!";
        isValid=false;
    }

    if(!reqNoStocks){
        errorReqStocks["reqCountError"]="Request Field is EMPTY!";
        isValid=false;
    }

    if(!reqNoStocks.match(/^[0-9]*$/)){
        errorReqStocks["reqCountError"] = "Request can contain numbers Only!";
        isValid=false;
    }
    
       
    this.setState({errorReqStocks:errorReqStocks, errorReqDate:errorReqDate, errorDate:errorDate, errorRegPrice:errorRegPrice});
    return isValid;
  }

  /** */

  onSubmit=(e)=>{
    e.preventDefault();

    // const id = this.props.match.params.id;

    /** */
   
    const isValid = this.formValidation();
    if(isValid){
    const{product_id,product_type, reqNoStocks,reqDate,DueDate,regPrice}= this.state;

    const data={
        product_id:product_id,
        product_type:product_type,
        reqNoStocks:reqNoStocks,
        reqDate:reqDate,
        DueDate:DueDate,
        regPrice:regPrice
    }
        
    console.log(data);

    axios.post("http://localhost:8000/request/stocks/create",data).then((res)=>{
      if(res.status==200){
        toastMsg("Request created Successfully!",'success')
        window.location.href='/reqStocks';
        this.setState(
          {
            product_id:"",
            product_type:"",
            reqNoStocks:"",
            reqDate:"",
            DueDate:"",
            regPrice:""
          }
        )
      }
    })

    
    }
}

componentDidMount(){
    this.retrieveProducts();
    
}

retrieveProducts(){
    axios.get("http://localhost:8000/product/get").then(res=>{
        if(res.status==200){
            this.setState({
                reqStocks:res.data.existingProducts
            });
            console.log(this.state.reqStocks)
        }
    });
}


onCancel(){
    window.location.reload();
}

    render(){
        const{errorReqStocks}=this.state;
        const{errorReqDate}=this.state;
        const{errorDate}=this.state;
        const{errorRegPrice}=this.state;
        

        return(
            <>
                <StockNavbar/>
                <br/>
                <h3 className={stockManagementStyles.heading}>REQUISITION REGISTRATION</h3>
               
                <br/>
                <div className={stockManagementStyles.main}>
                <br/>

                <div className='card' style={{
                    marginTop:'60px',
                    marginLeft:'-400px',
                    width:'900px',
                    height:'auto',
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
                                <select id="product_id" onChange={this.handleIdInputSelect} value={this.state.product_id} 
                                    className="btn btn-outline-secondary dropdown-toggle" 
                                    style={{marginLeft:'30px', width:'auto'}}>
                                    <option selected> Choose product id</option>
                                    {
                                        this.state.reqStocks.map((object) => (
                                        
                                            <option>{object.productId}</option>
                                        ))

                                    }

                                </select>
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
                                    {Object.keys(errorReqStocks).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorReqStocks[key]}</div>
                            })}
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
                                    <option selected> Choose product type</option>
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
                                    {Object.keys(errorRegPrice).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorRegPrice[key]}</div>
                            })}
                            {/* <span 
                                    value={this.state.regPrice}
                                    // onChange={this.handleValueChange}
                                    style={{marginLeft:'-30px', width:'auto'}}>
                                    {this.getValue()}
                            </span> */}
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
                                    }}>REQUESTED DATE
                                </label>
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="reqDate"
                                    placeholder="Enter requested date"
                                    value={this.state.reqDate}
                                    onChange={this.handleInputChange}
                                    style={{
                                        marginLeft:'30px'
                                    }}
                                    />
                                    {Object.keys(errorReqDate).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'30px'}} key={key}>{errorReqDate[key]}</div>
                            })}
                            </div>
                            </div>
                            
                            <div class="col-lg-5" style={{
                                marginLeft:'150px'
                            }}>
                            <div class="mb-3">
                            <button class="btn btn-outline-primary" type="submit" style={{
                                width:'auto',
                                fontWeight:'600',
                                marginTop:'30px',
                                marginLeft:'-30px'
                                }} onClick={this.onSubmit}>
                            
                                &nbsp; Add &nbsp;
                            </button>
                            <button class="btn btn-outline-secondary" type="submit" 
                                style={{
                                marginLeft:'20px',
                                width:'auto',
                                fontWeight:'600',
                                marginTop:'30px',
                                
                                }}
                                onClick={this.onCancel}
                            >
                            &nbsp; Cancel &nbsp;    
                            </button>
                            </div>
                            </div>
                            </div>
                           
                            <br/>
                            <div className='row'>
                            <div class="col-lg-5">
                            <div class="mb-3">
                                <label class="form-label" style={{
                                    fontWeight:'bold',
                                    marginLeft:'30px'
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
                                        marginLeft:'30px'
                                    }}
                                    />
                                    {Object.keys(errorDate).map((key)=>{
                                    return <div style={{color:'red',marginLeft:'30px'}} key={key}>{errorDate[key]}</div>
                            })}
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
