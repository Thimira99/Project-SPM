import React, { Component } from 'react'
import axios from 'axios';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";

export default class AddSupplier extends Component {

  constructor(props){
    super(props);
    this.state={
        
        dateCreated:"",
        supplierId:"",
        supplier:"",
        contactPerson:"",   
        status:"",    
       
         /** */
        errorA:{},
        errorB:{},
        errorC:{},
        errorD:{},
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
  const{dateCreated,supplierId,supplier,contactPerson}=this.state;
  let isValid = true;
  const errorA ={};
  const errorB={};
  const errorC={};


  if(!supplierId){
      errorA["supplierIdInput"] = "Supplier Id Field is EMPTY!";
      isValid=false;
  }

  if(!supplier){
    errorB["supplierFieldInput"] = "Supplier Field is EMPTY!";
    isValid=false;
  }
    if(!contactPerson){
        errorC["contactPersonFieldInput"] = "Contact Person Field is EMPTY!";
        isValid=false;
    }
  if(!supplierId.match(/^[a-z A-Z 1-9]*$/)){
      errorA["supplierIdInputPattern"] = "Supplier Id must contain characters only!";
      isValid=false;
  }


   



  this.setState({errorA:errorA,errorB:errorB,errorC:errorC});
  return isValid;
}
/** */

  onSubmit=(e)=>{
    e.preventDefault();

    /** */
    const isValid = this.formValidation();
    if(isValid){


    const{dateCreated,supplierId,supplier,contactPerson,status}= this.state;

       
    const data={
        
        dateCreated:dateCreated,
        supplierId:supplierId,
        supplier:supplier,
        contactPerson:contactPerson, 
        status:status
    }
        
    console.log(data);

    axios.post("http://localhost:8000/supplier/post",data).then((res)=>{
      if(res.data.success){
        alert("Supplier added Successfully!");
        window.location.href='/supplierList';
        this.setState(
          {
            dateCreated:"",
            supplierId:"",
            supplier:"",
            contactPerson:"",
            status:"" 
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

    return (
        <>
        <ProductManagerDashboard/>


        <Row>
      <div className='container'>
      <div className = 'card' style={{marginLeft:'220px', marginTop:'20px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      
      

        <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> ADD SUPPLIER </h3>
        <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
        <a href="/supplierList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
          SUPPLIER LIST
        </a></button><br/> 
        <form className='needs-validation' noValidate onSubmit={this.onSubmit}>
         
          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUPPLIER ID</label>
            <input 
              type="text"
              className="form-control"
              name="supplierId"
              placeholder="Enter Supplier Id"
              value={this.state.supplierId}
              onChange={this.handleInputChange}
            />
             {Object.keys(errorA).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorA[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>SUPPLIER</label>
            <input 
              type="text"
              className="form-control"
              name="supplier"
              placeholder="Enter Supplier"
              value={this.state.supplier}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorB).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorB[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>CONTACT PERSON</label>
            <input 
              type="text"
              className="form-control"
              name="contactPerson"
              placeholder="Enter Contact Person"
              value={this.state.contactPerson}
              onChange={this.handleInputChange}
            />
            {Object.keys(errorC).map((key)=>{
              return <div style={{color:'red'}} key={key}>{errorC[key]}</div> })}
          </div>

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
            <input 
              type="text"
              className="form-control"
              name="status"
              placeholder="Enter Status"
              value={this.state.status}
              onChange={this.handleInputChange}
            />
          </div>

          {/* <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
                  <select id="status" value={this.state.status} onChange={this.handleChange} className="btn  dropdown-toggle">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
          </div> */}

          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>DATE CREATED</label>
            <input 
              type="date"
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
          <button className="btn" type="submit" style={{marginTop:'15px',marginBottom:'150px', marginLeft:'-70px', backgroundColor: 'rgba(6, 21, 117)', color:"#ffffff", fontWeight:'bold'}} ><a href='/SupplierList' style={{textDecoration:'none',color:'white'}}> 
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
