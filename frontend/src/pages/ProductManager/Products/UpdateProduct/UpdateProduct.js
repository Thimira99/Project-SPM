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
       
        
    }
  }
    handleInputChange=(e)=>{
      const {name,value} = e.target;

      this.setState({
          ...this.state,
          [name]:value
      })
  }

 
 

  onSubmit=(e)=>{
    e.preventDefault();

    const id = this.props.match.params.id;

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

    axios.put(`http://localhost:8000/product/update/${id}`,data).then((res)=>{
      if(res.data.success){
        alert("Product is updated Successfully!");
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

componentDidMount(){
  const id=this.props.match.params.id;

  axios.get(`http://localhost:8000/product/get/${id}`).then((res) =>{
      if(res.data.success){
          this.setState({
            dateCreated:res.data.product.dateCreated,
            productId:res.data.product.productId,
            productName:res.data.product.productName,
            productType:res.data.product.productType,
            quantity:res.data.product.quantity,
            weight:res.data.product.weight,
            price:res.data.product.price
          });

           
      }
  });

  axios.get("http://localhost:8000/product/get").then((res)=>{
      if(res.data.success){
          this.setState({
              products:res.data.existingProducts
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
      
      

        <h3   style={{color: 'rgba(6, 21, 117)', fontWeight:'bold'}}> UPDATE PRODUCT </h3>
        <button className="btn btn-primary" style={{"width": "360px", "fontWeight": "600"}}>
        <a href="/productList" style={{textDecoration:'none',color:'white', fontWeight:'bold',}}>
          PRODUCT LIST
        </a></button><br/> 
        <form className='needs-validation' noValidate >
         
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
