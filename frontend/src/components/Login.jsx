
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

 const navigate = useNavigate();

  const initialdata={
    email: "",
    password: ""
  };

  

  const [data,setdata]=useState(initialdata);
  const[error,seterror]=useState("");
  const [datalist,setdatalist]=useState();
  const Ref=useRef(null);

  
    useEffect(()=>
    {
      Ref.current?.focus();
    },[]);
  

    
const handleChange=(event)=>{
const {name,value}=event.target;
setdata({
...data,
[name]:value
})}


const handleSubmit=async(event)=>{
event.preventDefault();
           
let url = "http://localhost:5000";


// await fetch(url+"/login",{method : "POST",headers:{'content-Type:application/json',}, body:JSON.stringify(data) })
//     .then(dbres)=>
//      {

try{
let response=await axios.post("http://localhost:5000/login",data,{withCredentials: true});//this withcredentials tells Axios to send cookies/credentials with each request so that the cookies are properly set.

    if(response.status===200)
    {
          navigate("/dashboard");
          setdata(initialdata);
          Ref.current.focus(); 
    }
}
catch(error)
{
  if(error.response){//axios stores status in error.response.status. error is a whole obj.
  if(error.response.status===401){
      seterror("Invalid Credentials!");   
    }
    if(error.response.status===500){
      console.log("Internal error!");   
    }
    else
    {
      console.log("something went wrong!");
    }

  }
}

   
 }

    







  return (
    <div>
      
        <center>
            <h1>Enter Details to Login!</h1>
           New User? <Link to="/register">Register Page</Link>

          <br /><br /><br /><br></br><br /><br></br><br /><br />
          <h3><i>Enter Info!</i></h3>
       <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off">


         <TextField
          required
          inputRef={Ref}
          name='email'
          id="filled-helperText"
          label="email"
          defaultValue="Enter email"
          variant="filled"
            value={data.email}
            helperText="Include @gmail.com"
          onChange={handleChange}
          

        />
        <br />
        <br />
         <TextField
          required
          name='password'
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          value={data.password}
          onChange={handleChange}


        /> 
        <br />
      <span style={{ color: "red"}}>{error}</span>
       <br /><br />
   
<Button variant="contained"  color="primary" onClick={handleSubmit} > 
  SUBMIT
</Button>


 </Box> 
 </center>
 

    </div>
  )
}

export default Login
