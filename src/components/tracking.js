import React,{useState,useEffect} from 'react'



const Tracking =(props) => {

    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
    const[datas,setDatas] = useState([])
    const[data,setData] = useState([])
    const[low,setLow] = useState([])
    const[ratio,setRatio] = useState([])
    const[change,setChange] = useState([])
    const[yearChange,setYearChange] = useState([])
    // const[dates,setDates] = useState([])
    // const[price,setPrice] = useState([])
    
    
    useEffect(() => {StockPrice()},[])
    
    // useEffect(() => {sendDataTwo()},[])
    const StockPrice = async() =>{
        
        try{
          
            const response = await fetch(`http://127.0.0.1:5000/api/prices/${props.data[0]}/${token}`);
            const res = await response.json();
            if(res.current_price){
                setDatas(res.current_price)
                setData(res.stats)
                setLow(res.low)
                setRatio(res.ratio)
                setChange(res.change)
             
                setYearChange(res.yearchange)
                console.log(res.current_price)
            }

          } catch(error) {
            console.log(error)
          }
          };

         
return (
  
    //  <div class = 'container'>
  <div class = 'rowss'>
    <div class = 'colum'> 
     
    
  <div class ='cards'>  
<h2>{props.data[0]}</h2>
<hr color='black'></hr>
<h5> 24HR Change</h5>
<h4> {change >0 ? '+' +change : change }</h4>
<h3>  {'$'+datas}</h3>
<p> Week52high: {'$'+data}</p>
<p> Week52low: {'$'+low}</p>
<p> P/E Ratio: {ratio}</p>
{/* <p> YTD%Change: {yearChange.toFixed(2)}</p> */}


  </div> 
 
     </div>
    </div>  
    // </div>
     
)
}
export default Tracking