import React,{useState} from 'react';
import moment from 'moment';

const Purchase = () => {
    const[nsf,setNSF] = useState("")
    const[inputTicker,setInputTicker] = useState("")
    const[inputAmount,setInputAmount] = useState("")
    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
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

    const Buy= async () => {
        
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
    }
    
    
    const Sell= async () => {
        
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
         setNSF(res.Insufficient_funds)
    }
    
    let now = moment().format("MM/DD/YYYY HH:mm:ss")


return (
<div>

</div>
)
}
export default Purshase