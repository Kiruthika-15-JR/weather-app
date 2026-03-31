import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function Dashboard() {


   const navigate=useNavigate();
   const handleClick = () => {
    console.log("Card clicked!");
    navigate("/weather");
    // You could also navigate, open modal, etc.
  };

  return (
    <div>
      <center>
        <br />
    
      <h1>Dashboard page</h1>
        <Link to="/logout">Logout</Link>
     <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
       <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="140"
          image="/images/image2.jpg"
          alt="weather_image"
        />
        <CardContent style={{backgroundColor:"lightblue"}}>
          <Typography gutterBottom variant="h5" component="div">
           <b> Weather!</b>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <i>Click Here to See the Weather Condition of Your City!</i>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </center>
    </div>
  )
}

export default Dashboard




