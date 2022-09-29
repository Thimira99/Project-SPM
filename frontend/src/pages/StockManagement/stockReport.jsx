import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from "jspdf";
import AccountCSS from './account.module.css';
import StockNavbar from '../../components/Stock Management/StockNavBar';

export default class stockReport extends Component{
    constructor(props){
        super(props);

        this.state={
            stocks:[],
             date: new Date(),
             hours:new Date().getHours(), //To get the Current Hours
             min:new Date().getMinutes(), //To get the Current Minutes
             sec:new Date().getSeconds() //To get the Current Seconds

        };
    }
    generatePDF=()=>{
        const doc = new jsPDF('p','pt',[1120, 1310]);//(p,pt= points (mm,cm),page size)
        doc.html(document.querySelector("#stockRepo"),{
            callback:function(pdf){
                const pageCount = doc.internal.getNumberOfPages(0);
                pdf.save("Summary stock Details");
            }
        });
    };
    componentDidMount(){
        this.retrieveStocks();
    }
    retrieveStocks(){
        axios.get("http://localhost:8000/retrieve/stocks").then(res=>{
            if(res.status==200){
                this.setState({
                    stocks:res.data.data
                });

                console.log(this.state.stocks)
            }
        });
    }
    
    render() {
        return (
            <>
            <StockNavbar />
            <div className='card' style={{marginTop:'0px',width:'100%',alignItems:'center',marginLeft:'0px',border:'none'}} >
            

                <div className="row">
                
                <br/>
                <br/>
                <div className="col-lg-9 mt-2 mb-2"><br/><br/>
            
                    &nbsp;&nbsp;&nbsp;
            <button class="btn btn-outline-primary" type="submit"
             style={{
                                width:'auto',
                                height:'auto',
                                fontWeight:'600',
                                // marginTop:'-150px',
                                marginLeft:'20px'
                    }}
             onClick={this.generatePDF}>
                   
                    Generate report
                   
                    </button>

                   
                </div>

                    {/* Stock report  */}
                <div id="stockRepo">
                    {/* <img src={gqheader} alt='' style={{width:'100%'}}/> */}
                    <hr/>
                <h2 style={{marginLeft:'400px',color:'black'}}>Summary Stock Report</h2>
                {/* <h4 style={{color:'black',fontWeight:'bolder',marginTop:'50px',marginLeft:'400px'}}> 
                Total number of Stocks: 
                    {this.state.stocks.reduce(
                           (sum,stock)=>sum+stock.stock_count,0
                    )}
                </h4> */}
            
               <table style={{marginTop:'40px',backgroundColor:'#ffff',borderRadius:'30px',borderColor:'#ffff',marginLeft:'200px',width:'auto'}}>
                   <thead>
                    <tr  style={{fontWeight:'bold',color:'black',fontSize:'20px', width:'auto'}}>
                        <th scope="col" style={{width:'50px'}}>#</th>
                        <th scope="col" style={{width:'130px'}}>Product Code</th>
                        <th scope="col" style={{width:'130px'}}>product type</th>
                        <th scope="col" style={{width:'130px'}}>Product name</th>
                        <th scope="col" style={{width:'130px'}}>Regular price</th>
                        <th scope="col" style={{width:'130px'}}>Stock count</th>
                        <th scope="col" style={{width:'130px'}}>Registered date</th>
                    </tr>
                    </thead>
                <tbody>
                    {this.state.stocks.map((stocks,index)=>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>
                            
                                {stocks.product_id}
                           
                        </td>
                        <td>{stocks.product_type}</td>
                        <td>{stocks.product_name}</td>
                        <td>{stocks.stock_count}</td>
                        <td>{stocks.regular_price}</td>
                        <td>{stocks.reg_date}</td>
                       
                    </tr>
                    ))}
                </tbody>
               </table>
               <br/>
                    <hr/>
                    <h6 id="gqcenter" style={{marginLeft:'50px'}}>
                    SNACKHACK 365 <br/>
                    Stock summary report <br/>
                    on {this.state.date.toLocaleDateString()}<br/>
                    At {this.state.hours}:{this.state.min}:{this.state.sec}
                    </h6>
                    <br/>
                    <div style={{marginLeft:'900px',marginTop:'-120px'}}>
                    <p>.................................</p>
                    <h6>Signature</h6></div>
                    <div className="date" style={{marginLeft:'900px'}}>
                        <p> Date {this.state.date.toLocaleDateString()}</p>
                    </div>


                    
            </div>
            
            </div>
            </div>
            </> 
            
        )
    }
}