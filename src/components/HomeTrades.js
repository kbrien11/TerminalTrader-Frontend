import React from 'react'


const Trades = (props) => {
  
return (
 
  <div class = 'table-box'>
    <div class = 'table-row'>
      <div class = 'table-cell'>
   <h1>{props.datas[5]} </h1>
        
        <p> Bought {props.datas[3]} Shares({'$'+props.datas[4]})  of {props.datas[2]} on {props.datas[6]} </p>
     
     </div>
     </div>
   
  </div>
    

)
}
export default Trades