import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Register() {
  {

  const initialdata={
    firstname: "",
    lastname:"",
    email: "",
    password: "",
    error:{
    firstname: "",
    lastname:"",
    email: "",
    password: ""
    }
  };

  

 const navigate = useNavigate();

  const [data,setdata]=useState(initialdata);
  const [error,seterror]=useState("");
  const [datalist,setdatalist]=useState();
  const Ref=useRef(null);

  

  useEffect(()=>
  {
    Ref.current?.focus();
  },[]);

const handleChange=(event)=>{
const {name,value}=event.target;
const{error}=data;

  // if (name === "number") {
  //   if (!/^\d*$/.test(value))
  //     {return;   }   
  //   if (value.length > 10)
  //     {return;   }   
                
  // }

validate(name,error,value);
setdata({
...data,
[name]:value,
error
})



}
const validate=(key,error,value)=>{
switch(key){
  case "firstname":{
    const regexname= /^[A-Za-z ]+$/;
    if(value.length<=2)
    {error.name="First Name required"}
    else if(!regexname.test(value))
    {error.name = "name is invalid";}
    else
    {error.name="";}
    break;
  }
    case "lastname":{
    const regexname= /^[A-Za-z ]+$/;
    if(value.length<=2)
    {error.name="Last Name required"}
    else if(!regexname.test(value))
    {error.name = "name is invalid";}
    else
    {error.name="";}
    break;
  }
  case "email":{
    const regexemail=/^\w\w{2,6}@gmail.com$/
    if(value==="")
    {error.email="Email required";}
    else if(!regexemail.test(value))
    {error.email="Invalid Email format!"}
    else
    {error.email=""}
    break;
  }
  case "password":{
    const regexpassword=/^[\w.][\w.%&#@!]{7,9}$/
    if(value==="")
    {error.password=" Password required"}
    else if(!regexpassword.test(value))
    {error.password="Invalid password! Ensure your password contains 8to10 chars";}
    else
    {error.password=""}
    break;
  }
}
}
const handleSubmit=async(event)=>{
       event.preventDefault();
        const values = Object.values(data);
        const keys = Object.keys(data);
        const error = { ...data.error };    
        keys.forEach(key => {
            validate(key, error,data[key]);
        });
        const errorValues = Object.values(error);
        const isValid = errorValues.every(item => item.length === 0);
        console.log(isValid);
        if(isValid){
          try{
          let res=await axios.post("http://localhost:5000/register",data,{withCredentials:true});//this withcredentials tells Axios to send cookies/credentials with each request so that the cookies are properly set.
           
          if(res.status===200)
          {
          console.log("Response got!! User Successfully Registered")
            navigate("/login");
            setdata(initialdata);
            Ref.current.focus(); 
          }
          }
         catch (error) //error->whole error obj
         {
         if (error.response) {
            // Error response from server
            if (error.response.status === 409) {//axios puts http status codes inside error.response.status
                seterror("User/Email already exists!"); 
            } else {
                seterror("Some error occurred: "+error.message);
            }
        } else {
            // No response or network error
            seterror("Network error or server not reachable");
        }
    }
}
        else{
          alert("Please Fill all the details!")
            setdata({
                ...data,
                error
            })

        }
    }

         
            
        


  return (
    <div>
      <center><h1>Enter details to Register!</h1>
     Already have an Account? <Link to="/login">Login page</Link>
       </center>
        <br></br>
        <center>
       <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
       >
      <span style={{ color: "red"}}>{error}</span>
      <br /><br />
       
        <TextField
         inputRef={Ref}
          required
          name='firstname'
          label="firstName"
          defaultValue="Enter firstname"
          variant="outlined"
          value={data.firstname}
          onChange={handleChange}
          
         
        />
      <span style={{ color: "red"}}>{data.error?.firstname}</span>

        <br></br>
        
        <TextField
        
          required
          name='lastname'
          label="lastName"
          defaultValue="Enter lastname"
          variant="outlined"
          value={data.lastname}
          onChange={handleChange}
          
         
        />
      <span style={{ color: "red"}}>{data.error?.lastname}</span>

        <br></br>
          <TextField
          required
          name='email'
          id="filled-helperText"
          label="email"
          defaultValue="Enter email"
          variant="filled"
            value={data.email}
            helperText="Include @gmail.com"
          onChange={handleChange}

        />
      <span style={{ color: "red"}}>{data.error?.email}</span>


        <br></br>
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
          helperText="Only alphabets,numbers and ._%&#@! these special chars are accepted"


        /> 
      <span style={{ color: "red"}}>{data.error?.password}</span>

<br />
<br></br>
   
    <Button variant="contained"  color="success" onClick={handleSubmit} > 
  SUBMIT
</Button>


 </Box>
 </center>
 


    </div>
  )
}


}

export default Register
