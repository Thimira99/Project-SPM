import React, { Component } from 'react';
import StockNavbar from '../../components/StockNavBar';
import TopBar from '../../components/Topbar';
import axios from 'axios';
import stockManagementStyles from './createStocks.module.scss'


export default class createRequestStocks extends Component{

    constructor(props){
        super(props);

        this.state={
            product_id:"",
            product_type:"",
            product_name:"",
            DueDate:"",
            qty:"",
            reqStocks:[],

               /** */
        errorId:{},
        erroridEmp:{},
        errorType:{},
        errorName:{},
        errorDate:{},
        errorCount:{}

        };
        
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

formValidation = () =>{
    const{product_id, product_type,product_name,DueDate,qty}=this.state;
    let isValid = true;
    const errorId={};
    const errorType ={};
    const errorName = {};
    const errorDate = {};
    const errorCount={};

    if(!product_id.match(/^[A-Z]{4,}[0-9]{3,}$/)){
        errorId["idInput"] = "Product Id should contain at least 4 uppercase letters and at least 3 numbers"
    }

    if(!product_id){
        errorId["idEmpty"]="Product Id Field is EMPTY!"
    }

    if(!product_type.match(/^[a-z A-Z]*$/)){
      errorType["productTypeInput"] = "Product Type must contain characters only!";
        isValid=false;
    }
  
    if(!DueDate){
        errorDate["dateInput"]="Due date Field is EMPTY!";
        isValid=false;
    }
  
    if(!qty.match(/^[0-9]*$/)){
        errorCount["countError"] = "Count can contain numbers Only!";
        isValid=false;
    }
  
    if(!product_name){
        errorName["productNameInput"] = "Name Field is EMPTY!";
        isValid=false;
    }
  
       
    this.setState({errorType:errorType,DueDate:DueDate,errorCount:errorCount,errorName:errorName});
    return isValid;
  }

  /** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
   
    const isValid = this.formValidation();
    if(isValid){
    const{product_id,product_type,product_name,DueDate,qty}= this.state;

    const data={
        product_id:product_id,
        product_type:product_type,
        product_name:product_name,
        DueDate:DueDate,
        qty:qty,
    }
        
    console.log(data);

    axios.post("http://localhost:8000/request/stocks/create",data).then((res)=>{
      if(res.data.success){
        alert("Request created Successfully!")
        window.location.href='/reqStocks';
        this.setState(
          {
            product_id:"",
            product_type:"",
            product_name:"",
            DueDate:"",
            qty:"",
          }
        )
      }
    })

    
    }
}

componentDidMount(){
    this.retrieveReqStocks();
}

retrieveReqStocks(){
    axios.get("http://localhost:8000/retrieve/request/stocks").then(res=>{
        if(res.data.success){
            this.setState({
                reqStocks:res.data.existingReqStocks
            });
            console.log(this.state.reqStocks)
        }
    });
}
    render(){
        const {errorId}= this.state;
        const{errorType}=this.state;
        const{errorDate}=this.state;
        const{errorCount}=this.state;
        const{errorName}=this.state;

        return(
            <>
                <TopBar/>
                <div className={stockManagementStyles.main}>
                <StockNavbar/>
                <div className='container'>
                    <h1 style={{
                        marginLeft:'450px',
                        marginTop:'10px'
                    }}>REQUEST A STOCK!</h1>
                    <br/>
                    <div className='card' style={{
                        border:'none'
                    }}>
                  
                        <form className='needs-validation' noValidate onSubmit={this.onSubmit} style={{
                            height:'auto'
                        }}>
                            <div className='form-group'>
                                <label style={{
                                    fontWeight:'bold'
                                }}>
                                PRODUCT ID
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_id"
                                    placeholder="Enter product id"
                                    value={this.state.product_id}
                                    onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorId).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorId[key]}</div>
                            })}
                            </div>
                            
                            <br/>

                            <div className='form-group'>
                                <label style={{
                                    fontWeight:'bold'
                                }}>
                                PRODUCT TYPE
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_type"
                                    placeholder="Enter product name"
                                    value={this.state.product_type}
                                    onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorType).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorType[key]}</div>
                            })}
                            </div>

                            <br/>

                            <div className='form-group'>
                                <label style={{
                                    fontWeight:'bold'
                                }}>
                                PRODUCT NAME
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="product_name"
                                    placeholder="Enter product name"
                                    value={this.state.product_name}
                                    onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorName).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorName[key]}</div>
                            })}
                            </div>

                            <br/>

                            <div className='form-group'>
                                <label style={{
                                    fontWeight:'bold'
                                }}>
                                DUE DATE
                                </label>
                                <input 
                                    type="date"
                                    className="form-control"
                                    name="DueDate"
                                    placeholder="Enter regular price"
                                    value={this.state.DueDate}
                                    onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorDate).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorDate[key]}</div>
                            })}

                            <br/>

                            <div className='form-group'>
                                <label style={{
                                    fontWeight:'bold'
                                }}>
                                QUANTITY
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="qty"
                                    placeholder="Enter regular price"
                                    value={this.state.qty}
                                    onChange={this.handleInputChange}
                                    />
                                    {Object.keys(errorCount).map((key)=>{
                                    return <div style={{color:'red'}} key={key}>{errorCount[key]}</div>
                            })}
                            </div>

                            </div>
                            <button className="btn btn-success" type="submit" style={{
                                marginTop:'15px',
                                marginBottom:'150px',
                                backgroundColor:'#287BD4',
                                fontWeight:'bold'
                                }} onClick={this.onSubmit}>
                            
                                &nbsp;REQUEST &nbsp;
                            </button>
                        <br/>
                        </form>
                    </div>
                </div>

                    
                </div>
            </>
        )
    }

}
