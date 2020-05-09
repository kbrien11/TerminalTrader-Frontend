import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Trades from './Trades'


const History = (props) => {
    const[datas,setDatas] = useState([])
    const[green,setGreen] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
    useEffect(() => {Trade()},[])
    
    const Trade = async() =>{   
        
        try{
            const response = await fetch(`http://127.0.0.1:5000/api/${token}/trades`);
            const res = await response.json();
            setDatas(res.trades)
            console.log(res.trades)
            // for( const obj of res.trades){
            //     if((obj[5]) ='Market Buy') {
            //        setGreen(true)
            //     }
            // }
            
          } catch(error) {
            console.log(error)
          }
          };

          const results = datas.map((i) => {
            return <Trades datas={i}/> 
          })
    

return (
  <div>
      <Navbar/>
   {results.length>0 &&<h2>My Trade Histroy</h2>}
   {results.length >0 && <hr color ='black'></hr>}
       {green && <p>'+'</p>}
       {results}
    </div>

)
}
export default History