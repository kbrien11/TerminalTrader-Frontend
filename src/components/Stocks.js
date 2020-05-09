import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import StockSearch from './StockSearch'
import moment from 'moment';
import Plot from 'react-plotly.js';
import currentEquity from './Equity';


const Stocks = () => {

    const[inputTicker,setInputTicker] = useState("")
    const[inputAmount,setInputAmount] = useState(0)
    const[data,setData] = useState([])
    const[news,setNews] = useState("")
    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
    const[isError,setIsError] = useState("")
    const[nsf,setNSF] = useState("")
    const[noShares,setNoShares] = useState("")
    const[error,setError]= useState("")
   const[chartData,setChartData] = useState([])
   const[balance,setBalance] = useState([])
   const[shares,setShares] = useState([])
   const[buy,setBuy] = useState(false)
   const[sell,setSell] = useState(false)

    
   useEffect(() => {Balance()},[])


    const StockPrice = async() =>{
      
        try{
            setError(false)
            const response = await fetch(`http://127.0.0.1:5000/api/price/${inputTicker}/${token}`);
            const res = await response.json();
            if(res.current_price){
                setData(res.current_price)
                setNews(res.des)
                setChartData(res.chartData)
                setInputAmount(0)
                
            }
            
           else {
               setIsError(true)
               
           }

          } catch(error) {
            console.log(error)
            setError(true)
          
          }
          };
          const output = data.map((i) => {i})
       
          

          const track= async () => {
            
            const endpoint = `http://localhost:5000/api/track/${inputTicker}/${token}`;
            const data = {
              ticker:inputTicker
            };
            const configs = {
              method: "POST",
              mode: "cors",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(data)
            }
            const response = await fetch(endpoint, configs);
            const res = await response.json(); 
             console.log(res.token)
        }

        const Buy =() => {
          setBuy(true)
          setSell(false)
          setNoShares(false)
          setInputAmount(0)
          
        }
        const Sell =() => {
          currentShares()
          setSell(true)
          setBuy(false)
          setNSF(false)
          setInputAmount(0)
        }

        const confirmBuy= async () => {
            
            const endpoint = `http://localhost:5000/api/${token}/buy`;
            const data = {
              ticker:inputTicker,
              amount: inputAmount,
              unix_time:now,
              type:"Market Deposit",
            };
            const configs = {
              method: "POST",
              mode: "cors",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(data)
            }
            const response = await fetch(endpoint, configs);
            const res = await response.json(); 
             console.log(res.token)
             setNSF(res.Insufficient_funds)
             setNoShares(false)
        }
        
        
        const confirmSell= async () => {
            
            const endpoint = `http://localhost:5000/api/${token}/sell`;
            const data = {
              ticker:inputTicker,
              amount: inputAmount,
              unix_time:now,
              type:"Market Sell",
            };
            const configs = {
              method: "POST",
              mode: "cors",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(data)
            }
            const response = await fetch(endpoint, configs);
            const res = await response.json(); 
             console.log(res.token)
             setNoShares(res.Insufficient_funds)
             setNSF(false)
        }
        
        let now = moment().format("MM/DD/YYYY HH:mm:ss")

        const Balance = async() =>{
          try{
              const response = await fetch(`http://127.0.0.1:5000/api/${token}/balance`);
              const res = await response.json();
              setBalance(res.balance);
            } catch(error) {
              console.log(error)
            
            }
            };

            const currentShares = async() =>{
              try{
                const response = await fetch(`http://127.0.0.1:5000/api/num/${token}/${inputTicker}`);
                const res = await response.json();
                setShares(res.total)
                console.log(res.total)
                
              
              }catch(error) {
                console.log(error)
              
              }
           
            }
  
            console.log(shares)
       

          const total = (balance/data[2])
          const total_updated = total.toFixed(0)
return (
    <div >

    
       

<Navbar/>
<div class = 'rowTwo'>

{output.length>0 && <div class = 'otherColumn'>
  <Plot
        data={[
          {
          x:chartData[0],
            y: chartData[1],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'green'},
          },
          
        ]}
        layout={ {width: 720,height: 440,title:data[1]}}
      />  
   </div> }
   <div class = 'otherColumn'>
<input type = "text" placeholder ="Ticker..." onChange= {e => setInputTicker(e.target.value)} /> <br/>
<button type = 'button' onClick = {e => StockPrice()}> Search</button>
 {/* <button type = 'button' onClick = {e => Se()}> Search</button> */}
{error && <p>Stock doesnt exist, try again</p>}
 { output.length >0 &&<h2>Current Price</h2>}
{output.length>0 &&<p> {'$'}{data[2]}</p>}
</div>



   


 </div>
   
   
 



 {output.length > 0 &&   <div class = 'bodypurshase'>
 <div class = 'purchase'>
 {output.length > 0 && <button type = 'button' onClick ={ e => Buy()} > Buy {data[1]}?</button> }

 {output.length > 0 && <button type = 'button' onClick ={ e => Sell()} > Sell {data[1]}?</button> }
    </div>
     <div class = 'purchase'>
       {nsf && <p>Insufficient funds !!</p>}
       {noShares && <p> Not enough shares</p>}
       </div>
       {output.length > 0 && <span><p>Shares</p></span> }
      {output.length > 0 && <input type = 'text' placeholder = ' 0' onChange = {e => setInputAmount(e.target.value)} />} <br/>
      <div>
      {buy && <h4> You have {'$'+balance} to spend</h4>}
        </div>
        <div class = 'shares'>
      {buy && <h4>You can purshase up to {total_updated} shares of {inputTicker}</h4>}
          </div> 
          <div class = 'numshares'>
          {sell && <p>You can sell up to {shares} shares of {inputTicker}</p>}
          </div>
          <div class = 'purchase'>
         <div class = 'confirm'>
       {buy && <button type = 'button' onClick ={ e => confirmBuy()} > Confirm purchase</button> }
       {sell && <button type = 'button' onClick ={ e => confirmSell()} > Confirm Sell</button>}<br/>
     </div>
      {/* <div class = 'trackbutton'>
        
      {output.length > 0 &&<button type = 'button' onClick ={ e => track()} > Track {data[1]}</button>}<br/>
      
      </div>  */}
      </div>

      </div> }
       <div class = 'trackbutton'>
      {output.length > 0 &&<button type = 'button' onClick ={ e => track()} > Track {data[1]}</button>}<br/>
      </div> 
   
     <div class = 'news'>
      {output.length > 0 && <h3>About </h3>} <br/>
  { news.length >0 && <p>{news[0]}</p>}
   {/* {isError && <p> No Description</p>} */}
     {news.length >0 && <hr></hr>}
     </div>
  
      <div class = 'row'>
      <div class="column" >
       {output.length >0 && <h4> CEO </h4>}
      {output.length >0 && <p> {news[1]}</p>}
      </div>
     
      <div class="column" >
      {output.length >0 && <h4> Employees </h4>}
      {output.length >0 && <p>  {news[2]}</p>}
      </div>
        
      <div class="column" >
        {output.length >0 && <h4> Industry </h4>}
        {output.length >0 && <p>  {news[3]}</p>}
    
        </div>
        <div class="column" >
          {output.length >0 && <h4> HeadQuarters </h4>}
          {output.length >0 && <p>  {news[5], news[4]}</p>}
          </div>
          <div class="column" >
          {output.length >0 && <h4> peRatio </h4>}
          {output.length >0 && <p>  {data[3]}</p>}
          </div>
          <div class="column" >
          {output.length >0 && <h4> Market Cap </h4>}
          {output.length >0 && <p>  {data[4]}</p>}
          </div>
  
    </div>
  
  </div>
)
}
export default Stocks