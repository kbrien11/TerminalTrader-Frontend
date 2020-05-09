import React,{useState,useEffect} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const Pos = (props) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || "")
  const[datas,setDatas] = useState([])
  const[equity,setEquity] = useState(false)
  const[totalEquity,setTotalEquity] = useState([])

  
   
    useEffect(() => {StockPrice()},[])

  const StockPrice = async() =>{
      
      try{
        
          const response = await fetch(`http://127.0.0.1:5000/api/prices/${props.data[0]}/${token}`);
          const res = await response.json();
          if(res.current_price){
              setDatas(res.current_price)
              setEquity(true)
              console.log(res.pos)
              
             
          }

        } catch(error) {
          console.log(error)
         
        
        }
        
        }

        function myFunc(total,num) {
          return total+num
        }

const output = []
output.push(props.data[1])
const result = datas*(props.data[1])
const fixed = result.toFixed(2)

// const percent = props.data[1]/


// setTotalEquity(result)

 const outputs = output.reduce(myFunc)
 console.log(outputs)
  // const total =+ datas*(props.data[1]) 
// setTotalEquity( Number(result))



return (

    <div class = 'table-box'>
   <div class = 'table-row'>
     <div class = 'table-cell'>
     <div class = 'homePositions'> 
     
    {/* <h3>{'$'+datas}</h3>  */}
      <h2> {props.data[0]}</h2>
      {equity && <p> Total Equity: {fixed}</p>}
      <p> {props.data[1]} Shares</p> 
    
 

      {/* <h3>{'$'+datas}</h3>
      <h2> {props.data[0]}</h2>
      {equity && <p> Total Equity: {result}</p>}
      <p> {props.data[1]} Shares</p>  */}
      {/* <p>{props.total[0]}</p> */}
 
   
      </div>
     </div>
    </div>
   
    </div>
    

)
}
export default Pos