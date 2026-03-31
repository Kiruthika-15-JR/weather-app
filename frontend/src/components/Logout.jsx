import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    
     async function fn(){
        try{
             await axios.get("http://localhost:5000/logout");
              navigate("/");
        }
        catch(error){
            console.log(error);
            
        }
    
   }
    fn();
   
  return (
    <div>
    
    
    </div>

  )
}

export default Logout
