import React , {useState} from 'react';
import Home from './Home';
import { useHistory } from 'react-router-dom';
const Login = () => {

    const[inputEmail,setInputEmail] = useState('')
    const[inputPassword,setInputPassword] = useState('')
  
    const [isError,setIsError] = useState(false)
    const [token, setToken] = useState(false)



    const history =useHistory()

   const signin = async() =>{
       setIsError(false)
    const endpoint = "http://localhost:5000/api/log";
    const data = {
      email:inputEmail,
      password:inputPassword,
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
     sessionStorage.setItem("token", res.token)
     setToken(res.token)
     setIsError(true)
     if (res.token) {
     history.push ('/home')
   } 
}

return (
    <div>
    {token? <Home/> : (
    <div class = 'logincard'>
    


   
   
    <label for = 'email'> Email</label> <br/>
    <input type = 'text' id = 'email' placeholder = ' Your email ..' onChange={e => setInputEmail(e.target.value)}/> <br/>

    <label for = 'pass'> Password</label> <br/>
    <input type = 'text' id = 'pass' placeholder = ' Your password ..' onChange={e => setInputPassword(e.target.value)}/> <br/>
    <div>
    {isError && <p> Incorrect Email or password, please try again</p>}
    </div>
    <button onClick = {e=>signin()}>  Login</button> <br/>

    

    </div> )}
    </div>
)
}
export default Login