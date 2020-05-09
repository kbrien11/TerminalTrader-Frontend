import React, { useState, useEffect } from 'react';

import Navbar from './Navbar';
import Stocks from './Stocks';
import Tracking from './tracking';


import Portfolio from './Portfolio';
import Trades from './HomeTrades';
import HomeHist from './homeHistory';


const Home = () => {

    const[data,setData] = useState([])
    const[datas,setDatas] = useState([])
    const[trackingdata,setTrackingData] = useState([])
    const[trades,setTrades] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token'))
    const[inputAmount,setAmount] = useState("")
    const[inputdeposit,setDeposit] = useState(false)

 

    useEffect(() => {balance()},[])
    useEffect(() => {getTracking()},[])
    useEffect(() => {Equity()},[])
    // useEffect(() => {Trade()},[])
  
  

    const balance = async() =>{
        try{
            const response = await fetch(`http://127.0.0.1:5000/api/${token}/balance`);
            const res = await response.json();
            setData(res.balance);
          } catch(error) {
            console.log(error)
          
          }
          };

          // const Trade = async() =>{   
        
          //   try{
          //       const response = await fetch(`http://127.0.0.1:5000/api/${token}/recent`);
          //       const res = await response.json();
          //       setTrades(res.trades)
          //       console.log(res.trades)
               
          //     } catch(error) {
          //       console.log(error)
          //     }
          //     };
    

          const Equity = async() =>{
            try{
                const response = await fetch(`http://127.0.0.1:5000/api/${token}/equity`);
                const res = await response.json();
                setDatas(res.equity);
                console.log(res.equity)
              } catch(error) {
                console.log(error)
              
              }
              };


          const getTracking = async() =>{
            try{
                const response = await fetch(`http://127.0.0.1:5000/api/gettracking/${token}`);
                const res = await response.json();
                setTrackingData(res.tracking);
                for(const i of res.tracking){
                  console.log(i)
                }
                setToken(token)
              } catch(error) {
                console.log(error)
              
              }
              };

              const output = trackingdata.map((i) => {
                return <Tracking data={i}/> 
              })

              const limit_trades = trades.map((i) => {
                return <Trades datas={i} />
              })
            

      const deposit = async() =>{
      setDeposit(false)
     const endpoint = `http://localhost:5000/api/${token}/${inputAmount}`;
     const data = {
       amount:inputAmount,
       
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
      setDeposit(true)
      setDeposit(false)
    }

        
    
             
return (
    <div>
   <Navbar/>
  
   <div class = 'deposit'>
        <p> Would you like to deposit  money into your account?</p>

       
    <input placeholder= "amount" onChange = {e => setAmount(e.target.value)} />
    <button type = 'button' onClick = {e => deposit()}> Increase</button>
    {inputdeposit && <p> successfully addded!</p>}
    </div>
   <div class = 'homebalance'>
   < h2>  USD Balance</h2>
   <hr color ='black'></hr>
     
    <p>{'$' +data + ''}</p>
    </div>
    <div class = 'homebalance'>
   < h2>  Total Equity</h2>
   <hr color='black'></hr>
    <p>{'$' +datas + ''}</p>
    </div>
  
   
   {/* <div>

  
   </div> */}
   {/* <div class = 'othercontainer'>
    <div class ='homeh3'> */}
   {output.length >0 && <div class = 'grid'>
    {output.length >0 &&<h3> Tracking: {output.length}</h3>}
     {output.length >0 &&<hr></hr>} 
    
    
    {/* <div class = 'trackeroutput'> */}
      <div class = 'nested'>
        {output}
       
       </div>
        
       </div> }

       {output.length >0 &&<hr></hr>} 
       
       
{/*      
   <div class = 'homeRow'>
     <div class = 'homeColumn'> */}
       
   
   
   {/* </div> */}
     {/* <div class = 'homeColumn'>  */}
     {/* <div class = 'homeWrapper'> */}
   
     <div class = 'homeRow'>
   <div class = 'homeColumn'>
  <HomeHist />
    </div>
  
  
   <div class = 'homeColumn'>
   <Portfolio/>
   </div>
   </div>
   
    </div>
    
)
}
export default Home