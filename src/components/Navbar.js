import React from 'react';
import {Link as RouterLink} from 'react-router-dom';


const Navbar = () => {
return (
   
    <div class = 'navbar'>

     <div class ="links">
     <h3> S & S</h3>

     </div>
<a   href= '/home'as ={RouterLink}> Home  </a>

<a  href= '/stocks'as ={RouterLink}> Stocks </a>
<a  href= '/crypto'as ={RouterLink}> Crypto </a>
<a   href= '/history'as ={RouterLink}> History  </a>
  
  <span class = "logoutlink"> 
 <a  href= '/'as ={RouterLink}> Logout </a>
  </span> 
  
</div>
)
}
export default Navbar