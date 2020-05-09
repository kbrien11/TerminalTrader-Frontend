import React from 'react'

const StockSearch = (props) => {
return (
  <div class = 'searchstocks'>
      <p> Company:   {props.datas[3]}</p>
      <p> Ticker:   {props.datas[4]}</p>    
      <p> Current Price:   {props.datas[5]}</p>   
       
      
    </div>



)
}
export default StockSearch