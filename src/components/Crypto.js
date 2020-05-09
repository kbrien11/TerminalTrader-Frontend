import React,{useState} from 'react'
import Navbar from './Navbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const Crypto = () => {
    const[inputTicker,setInputTicker] = useState("")
    const[inputAmount,setInputAmount] = useState("")
    const[data,setData] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
    const[error,setError] = useState("")


    
          const CryptoPrice = async() =>{
            try{
                setError(false)
                const response = await fetch(`http://127.0.0.1:5000/api/crypto_price/${inputTicker}/${token}`);
                const res = await response.json();
                if(res.crypto){
                    setData(res.crypto)
                    
                }
                
               else {
                   setError(true)
                   
               }
    
              } catch(error) {
                console.log(error)
                setError(true)
              
              }
              };
              const useStyles = makeStyles((theme) => ({
                button: {
                  margin: theme.spacing(1),
                  position:"relative",
                },
              }));

              const classes = useStyles();
return (
    <div>
        <Navbar/>
<input type = "text" placeholder ="ticker..." onChange= {e => setInputTicker(e.target.value)} /> <br/>
{error && <p>Stock doesnt exist, try again</p>}

<Button
        variant="contained"
        color="primary"
        className={classes.button}
        type = 'button' onClick = {e => CryptoPrice()}
        
      >
        Search</Button>
        <div>
        {data}
        </div>
    </div>
)
}
export default Crypto