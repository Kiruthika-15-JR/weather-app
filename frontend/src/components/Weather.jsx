import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import CompressIcon from '@mui/icons-material/Compress';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import {Link} from 'react-router-dom'


function Weeklyweather() {


    const Ref=useRef(null);
    const [city,setcity]=useState("");
  const [datalist,setdatalist]=useState([]);
  const[loading,setloading]=useState(false);
  const [error,seterror]=useState(null);


  const api_key=process.env.REACT_APP_weather_api_key;

  useEffect(() => {//to change bg image dynamically when the component did mount for this specific (weather.jsx) component happens...
    document.body.style.backgroundImage = "url('/images/image1.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat="no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.height = "100vh";//for covering the whole page .

    
    return () => {
      document.body.style.backgroundImage = ""; // remove when leaving
    };
  }, []);


const handleChange=(event)=>{
     if(event.target.value?.length===0)
    {setdatalist([]);
     setloading(false);
    }
const value=event.target.value;
setcity(value);
console.log(city);
}


const handleSubmit=async(event)=>{
    try{
       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
         console.log(response.data);
         setdatalist(response.data);
         setloading(true);  
        // console.log("response received:  "+JSON.stringify(res.data)); //ref obj-string conversion screenshot in archive folder in phone.
    }
    catch(error){
        if(error.response.status===404)
        {    
            seterror("Invalid City Name!");
            console.log(error.message);

        }
        else if(error.response.status===400)
        {   
            seterror("Enter City Name!");
            console.log(error.message);

        }
        else{

            seterror("Error Occured "+error.message );
            console.log(error.message);
        }
    }

}



function createData(Properties,Details) {
  return { Properties,Details };
}

const rows = [
  createData('CityName', datalist.name),
  createData('Humidity (%)', datalist.main?.humidity),
  createData(<><CompressIcon></CompressIcon> Pressure (hPa)</>, datalist.main?.pressure),
  createData(<><AirIcon></AirIcon> Wind Speed (m/s)</>,datalist.wind?.speed),
  createData(<><ThermostatIcon></ThermostatIcon>Temperature</>,datalist.main?.temp),
  createData('Min_Temp (°C)',datalist.main?.temp_min),
  createData('Max_Temp (°C)',datalist.main?.temp_max),
  createData(<><CloudIcon></CloudIcon>   Weather Description</>,datalist.weather?.[0]?.description),

];



  return (
    <div>
        <center>
        <br>
        </br>
        <Link to="/logout">Logout</Link>
       
      <h1>You Will Get Your Weather Data Here!</h1>
        <TextField
                required
                inputRef={Ref}
                name='city'
                id="filled-helperText"
                label="cityName"
                defaultValue="Enter email"
                variant="filled"
                  value={city}
                onChange={handleChange}
              />&nbsp;&nbsp;

              <Button variant="contained"  color="primary" onClick={handleSubmit}>Search</Button>
              <br /><br />
        {error? <Alert severity="warning" variant='standard' onClose={() => {seterror(null)}}> {error}</Alert> :""}
        <br /><br />
 </center>
        
        {loading && 
   <Container maxWidth="xs" >

     <TableContainer component={Paper} sx={{backgroundColor:'transparent'}} >
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Properties</strong></TableCell>
            <TableCell align="right" ><strong>Details</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Properties}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Properties}
              </TableCell>
              <TableCell align="right">{row.Details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <br />
   <br></br>

   </Container>
        
        
        }

    </div>
  )
}

export default Weeklyweather




