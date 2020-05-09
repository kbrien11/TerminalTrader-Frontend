import React, { useState } from 'react'


const Trades = (props) => {



  
return (
 
  <div class = 'tradecontent'>
    <card>
    <div class = 'tradeequity'>
        <h3>{props.datas[5]==='Market Deposit' ? '+' + '$'+props.datas[4]: '-' + '$'+props.datas[4]}</h3>
        
        <p>{props.datas[3]} Shares</p>
      </div>
      <div class = 'trades'>
      <h3>  {props.datas[2]}({props.datas[5]}) </h3>
      <p> {props.datas[6]}</p>
      </div>
    <div class ='tradehr'>
     <hr></hr>
     </div>
     </card>
  
    </div>

)
}
export default Trades