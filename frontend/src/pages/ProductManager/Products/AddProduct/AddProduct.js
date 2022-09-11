import React, { Component } from 'react'
import axios from 'axios';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";

export default class AddProduct extends Component {

  constructor(props){
    super(props);
    this.state={
        
        dateCreated:"",
        productId:"",
        productName:"",
        productType:"",   
        quantity:"",
        weight:"",
        price:"",    
       
         /** */
        errorA:{},
        errorB:{},
        errorC:{},
        errorD:{},
        errorE:{},
        errorF:{},
    }
  }
    handleInputChange=(e)=>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

/** */
formValidation = () =>{
  const{productId,productName,productType, quantity, weight, price}=this.state;
  let isValid = true;
  const errorA ={};
  const errorB={};
  const errorC={};
  const errorD ={};
  const errorE={};
  const errorF={};


  if(!productId){
      errorA["productIdInput"] = "Product Id Field is EMPTY!";
      isValid=false;
  }

  if(!productName){
    errorB["productNameFieldInput"] = "Product Name Field is EMPTY!";
    isValid=false;
  }
    if(!productType){
        errorC["productTypeFieldInput"] = "Product Type Field is EMPTY!";
        isValid=false;
    }
    if(!quantity){
      errorD["quantityInput"] = "Quantity Field is EMPTY!";
      isValid=false;
  }

  if(!weight){
    errorE["weightFieldInput"] = "Weight Field is EMPTY!";
    isValid=false;
  }
    if(!price){
        errorF["priceFieldInput"] = "Price Field is EMPTY!";
        isValid=false;
    }


  if(!productId.match(/^[a-z A-Z 1-9]*$/)){
      errorA["productIdInputPattern"] = "Product Id must contain characters only!";
      isValid=false;
  }

  if((productId.length<=3)){
    errorA["productIdLength"] = "Product Id must be in length 4 or higher";
    isValid=false;
}


   



  this.setState({errorA:errorA,errorB:errorB,errorC:errorC,errorD:errorD,errorE:errorE,errorF:errorF});
  return isValid;
}
/** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if(isValid){


    const{dateCreated,productId,productName,productType,quantity,weight,price}= this.state;

       
    const data={
        
        dateCreated:dateCreated,
        productId:productId,
        productName:productName,
        productType:productType,
        quantity:quantity,
        weight:weight,
        price:price
    }
        
    console.log(data);

    axios.post("http://localhost:8000/product/post",data).then((res)=>{
      if(res.data.success){
        alert("Product added Successfully!");
        window.location.href='/productList';
        this.setState(
          {
            dateCreated:"",
            productId:"",
            productName:"",
            productType:"",
            quantity:"",
            weight:"",
            price:"" 
          }
        )
      }
    })
}
}

  
  render() {

    const{errorA}=this.state;
    const{errorB}=this.state;
    const{errorC}=this.state;
    const{errorD}=this.state;
    const{errorE}=this.state;
    const{errorF}=this.state;

    return (
        <>
        <ProductManagerDashboard/>


        <Row>
      <div className='container'>
      <div className = 'card' style={{marginLeft:'220px', marginTop:'20px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      
      

        <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> ADD PRODUCT </h3>
        <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
        <a href="/productList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
          PRODUCT LIST
        </a></button><br/> 
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
         
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>PRODUCT ID</label>
            <input 
              type="text"
              className="form-control"
              name="productId"
              placeholder="Enter Product Id"
              value={this.state.productId}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorA).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorA[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>PRODUCT</label>
            <input 
              type="text"
              className="form-control"
              name="productName"
              placeholder="Enter Product Name"
              value={this.state.productName}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorB).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorB[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>PRODUCT TYPE</label>
            <input 
              type="text"
              className="form-control"
              name="productType"
              placeholder="Enter Product Type"
              value={this.state.productType}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorC).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorC[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>QUANTITY</label>
            <input 
              type="number"
              className="form-control"
              name="quantity"
              placeholder="Enter Quantity"
              value={this.state.quantity}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorD).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorD[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>WEIGHT</label>
            <input 
              type="text"
              className="form-control"
              name="weight"
              placeholder="Enter Weight"
              value={this.state.weight}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorE).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorE[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>PRICE</label>
            <input 
              type="number"
              className="form-control"
              name="price"
              placeholder="Enter Price"
              value={this.state.price}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorF).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorF[key]}</div> })}
          </div>

          {/* <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
                  <select id="status" value={this.state.status} onChange={this.handleChange} className="btn  dropdown-toggle">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
          </div> */}

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>CREATED AT</label>
            <input 
              type="datetime-local"
              className="form-control"
              name="dateCreated"
              value={this.state.dateCreated}
              onChange={this.handleInputChange}
            />
          </div>

          <Row>
          <Col> 
          <button className="btn" type="submit" style={{marginTop:'15px',marginBottom:'150px', backgroundColor: 'rgba(6, 21, 117)', color:"#ffffff", fontWeight:'bold'}} onClick={this.onSubmit}>
            <i className="far fa-check-square"></i>
             &nbsp;Save
          </button>
          </Col>
          <Col> 
          <button className="btn" type="submit" style={{marginTop:'15px',marginBottom:'150px', marginLeft:'-70px', backgroundColor: 'rgba(6, 21, 117)', color:"#ffffff", fontWeight:'bold'}} ><a href='/ProductList' style={{textDecoration:'none',color:'white'}}> 
          <i className="far fa-check-square"></i>
            
             &nbsp;Cancel
             </a>
          </button>
          </Col>
          </Row>
           
        </form>

      </div>
      </div>
      </div>

      </Row>
       
       
      </>
    )
  }
}
