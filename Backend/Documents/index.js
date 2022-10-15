module.exports = ({ ShopObject, ProductObject, InvoiceObject }) => {
    const today = new Date();

    console.log("shopData 11", ShopObject);
    console.log("productData22", ProductObject);
    console.log("InvoiceData33", InvoiceObject);

    function getDueDate() {

        let date = Number(today.getDate());
        let month = Number(today.getMonth());
        let year = Number(today.getFullYear());
        let duedate = date + 10;
        month = month + 2;

        let retDate = ''
        if (duedate > 30) {
            const duedate = duedate - 30;
            if (month + 1 == 13) {

                if (month == 12) {
                    const month = 1;
                    const year = year + 1

                } else {
                    const month = month + 2;
                    const year = year

                }




            }

        }

        retDate = duedate + ". " + month + ". " + year

        return retDate;

    }


    return `
  
<!DOCTYPE html>
<html lang="en">
    <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          .clearfix:after {
            content: "";
            display: table;
            clear: both;
          }
          
          a {
            color: #5D6975;
            text-decoration: underline;
          }
          
          body {
            position: relative;
            width: 21cm;  
            height: max-content; 
            margin: 10px auto; 
            color: #001028;
            background: #FFFFFF; 
            font-family: Arial, sans-serif; 
            font-size: 12px; 
            font-family: Arial;
          }
          
          header {
            padding: 10px 0;
            margin-bottom: 30px;
          }
          
          #logo {
            text-align: center;
            margin-bottom: 10px;
          }
          
          #logo img {
            width: 90px;
          }
          
          h1 {
            border-top: 1px solid  #5D6975;
            border-bottom: 1px solid  #5D6975;
            color: #5D6975;
            font-size: 2.4em;
            line-height: 1.4em;
            font-weight: normal;
            text-align: center;
            margin: 0 0 20px 0;
            background: url(https://media.istockphoto.com/illustrations/minimal-geometric-blue-light-background-abstract-design-illustration-id1193878242?k=20&m=1193878242&s=612x612&w=0&h=ThcVvL--w394lYgqraiFPwL_5PZ8b1Q63RJPPSiPsCM=);
          }
          
          #project {
            float: left;
            margin-left: 10px;
            

          }
          
          #project span {
            color: #5D6975;
            text-align: right;
            width: 98px;
            margin-right: 10px;
            display: inline-block;
            font-size: 0.8em;
          }
          
          #company {
            float: right;
            text-align: right;
            margin-right: 20px;

          }
          
          #project div,
          #company div {
            white-space: nowrap;        
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            margin-bottom: 20px;
            
          }
          
          table tr:nth-child(2n-1) td {
            background: #F5F5F5;
          }
          
          table th,
          table td {
            text-align: center;
          }
          
          table th {
            padding: 5px 20px;
            color: #5D6975;
            border-bottom: 1px solid #C1CED9;
            white-space: nowrap;        
            font-weight: normal;
          }
          
          table .service,
          table .desc {
            text-align: left;
          }
          
          table td {
            padding: 20px;
            text-align: right;
          }
          
          table td.service,
          table td.desc {
            vertical-align: top;
          }
          
          table th.Tot {
            text-align: right;
          }

          table td.unit,
          table td.qty,
          table td.total {
            font-size: 1.2em;
          }
          
          table td.grand {
            border-top: 1px solid #5D6975;;
          }
          
          #notices .notice {
            color: #5D6975;
            font-size: 1.2em;
          }
          
          footer {
            color: #5D6975;
            width: 100%;
            height: 30px;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 8px 0;
            text-align: center;
          }
          </style>
       </head>
  <body>
    <header class="clearfix">
      <div id="logo">
        <img src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1">
      </div>
      <h1>INV${InvoiceObject.InvoiceNumber}</h1>
      <div id="company" class="clearfix">
        <div>SNACKHACK365</div>
        <div>${InvoiceObject.AgentNumber}</div>
        <div>389 - Dehiwala<br />  Mount Lavinia</div>
        <div>(602) 519-0450</div>
        <div><a href="mailto:SNACKHACK365@example.com">SNACKHACK365@example.com</a></div>
      </div>
      <div id="project">
        <div><span>SHOP NAME</span> ${InvoiceObject.ShopName}</div>
        <div><span>SHOP REG-NUMBER</span> ${ShopObject.sh_RegistrationNumber}</div>
        <div><span>OWNER NAME</span> ${ShopObject.name}</div>
        <div><span>SHOP ADDRESS</span> ${ShopObject.sh_Address}</div>
        <div><span>SHOP EMAIL</span> <a href=${ShopObject.sh_emailAddress}> ${ShopObject.sh_emailAddress}</a></div>
        <div><span>DATE</span> ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</div>
        <div><span>DUE DATE</span> ${getDueDate()}</div>
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th class="service">#</th>
            <th class="desc">PRODUCT NAME</th>
            <th class="desc">PRICE</th>
            <th class="desc">QTY</th>
            <th class="Tot">TOTAL</th>
          </tr>
        </thead>
        <tbody>
        ${ProductObject.map((obj, index) =>

        `   <tr>
            <td class="service">${index + 1}</td>
            <td class="desc">${obj.itemname}</td>
            <td class="desc">${(Number(obj.price)).toLocaleString('en-US')}</td>
            <td class="desc">${obj.qty}</td>
            <td >${obj.amount}</td>
          </tr>`


    )}

    <tr>
    <td colspan="4">SUBTOTAL</td>
    <td class="total">Rs. ${(Number(InvoiceObject.TotalAmount)).toLocaleString('en-US')}.00</td>
</tr>
<tr>
    <td colspan="4">Discount</td>
    <td class="total">--</td>
</tr>
<tr>
    <td colspan="4" class="grand total">GRAND TOTAL</td>
    <td class="grand total">Rs. ${(Number(InvoiceObject.TotalAmount)).toLocaleString('en-US')}.00</td>
</tr>
    
        
        </tbody>
      </table>
      <div id="notices">
        <div>NOTICE:</div>
        <div class="notice">A finance charge of 1.5% will be made on unpaid balances after 10 days.</div>
      </div>
    </main>
    <footer>
      Invoice was created on a computer and is valid without the signature and seal.
    </footer>
  </body>
</html>
    `;
};
