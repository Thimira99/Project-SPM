import React, { Component } from 'react'
import axios from 'axios';
import ProductManagerDashboard from '../../../../components/ProductManagerDashboard/ProductManagerDashboard';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import AccountCSS from './account.module.css';
import { BsRecord2Fill } from "react-icons/bs";

export default class UpdateSupplier extends Component {

  constructor(props){
    super(props);
    this.state={
        
        dateCreated:"",
        supplierId:"",
        supplier:"",
        contactPerson:"",   
        status:"",    
       
    }
  }
    handleInputChange=(e)=>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

  handleInputSelect=(e)=>{
    this.setState({status:e.target.value})
    console.log("status",e.target.value)
}


  onSubmit=(e)=>{
    e.preventDefault();

     
    const id = this.props.match.params.id;
    const{dateCreated,supplierId,supplier,contactPerson,status}= this.state;

       
    const data={
        
        dateCreated:dateCreated,
        supplierId:supplierId,
        supplier:supplier,
        contactPerson:contactPerson, 
        status:status
    }
        
    console.log(data);

    axios.put(`http://localhost:8000/supplier/update/${id}`,data).then((res)=>{
      if(res.data.success){
        alert("Supplier is updated Successfully!");
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


componentDidMount(){
  const id=this.props.match.params.id;

  axios.get(`http://localhost:8000/supplier/get/${id}`).then((res) =>{
      if(res.data.success){
          this.setState({
            dateCreated:res.data.supplier.dateCreated,
            supplierId:res.data.supplier.supplierId,
            supplier:res.data.supplier.supplier,
            contactPerson:res.data.supplier.contactPerson,
            status:res.data.supplier.status
          });

           
      }
  });

  axios.get("http://localhost:8000/supplier/get").then((res)=>{
      if(res.data.success){
          this.setState({
              suppliers:res.data.existingSuppliers
          })
      }
  })

}
  
  render() {



    return (
        <>
        <ProductManagerDashboard/>


        <Row>
      <div className='container'>
      <div className = 'card' style={{marginLeft:'220px', marginTop:'20px', background: "#D3D3D3",height:'auto',width:'600px',marginRight:'100px'}}>
      <div className='col-md-8 mt-4 mx-auto'>
      
      

        <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> UPDATE SUPPLIER </h3>
        <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
        <a href="/supplierList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
          VIEW SUPPLIER LIST
        </a></button><br/> 
        <form className='needs-validation' noValidate >
         
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
            
          </div>



          <div className='form-group' style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>STATUS</label>
                  <select id="status" value={this.state.status} onChange={this.handleInputSelect} className="btn dropdown-toggle" style={{backgroundColor: '#fff', marginLeft:'20px'}}>
                    <option selected> Select</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
          </div>

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
             &nbsp;Update
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
