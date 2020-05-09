import React,{useState} from 'react'
import {Link as RouterLink} from 'react-router-dom';

function SignUp () {
    const[inputEmail,setInputEmail] = useState('')
    const[inputPassword,setInputPassword] = useState('')
    const[inputFirst_name,setFirstName] = useState('')
    const[inputLast_name,setLastName] = useState('')


    const sendData = async() => {

        const endpoint = "http://localhost:5000/api/create";
        const data = {
          email:inputEmail,
          password:inputPassword,
          first_name:inputFirst_name,
          last_name:inputLast_name,
         
        };
        const configs = {
          method: "POST",
           mode: "cors",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        }
        const response = await fetch(endpoint, configs);
        const res = await response.json();
        console.log(res)

    }

return (
<div class = 'signupcard'>
   
    <label for = 'first'> First Name</label> <br/>
    <input type = 'text' id = 'first' placeholder = ' Your name ..' onChange={e => setFirstName(e.target.value)}/><br/>
    
    <label for = 'last'> Last Name</label> <br/>
    <input type = 'text' id = 'last' placeholder = ' Your Last name ..' onChange={e => setLastName(e.target.value)}/> <br/>
   
    <label for = 'email'> Email</label> <br/>
    <input type = 'text' id = 'email' placeholder = ' Your email ..' onChange={e => setInputEmail(e.target.value)}/> <br/>

    <label for = 'pass'> Password</label> <br/>
    <input type = 'text' id = 'pass' placeholder = ' Your password ..' onChange={e => setInputPassword(e.target.value)}/> <br/>
 
    <button onClick = {e=>sendData()}>  Register</button> <br/>
    <p> Already have an account?</p>
    <div class = 'signuplink'>
        < a link href = 'login' as = {RouterLink}> Log in Here</a>

    </div>

    
</div>
)
}
export default SignUp