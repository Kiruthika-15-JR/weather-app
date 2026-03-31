import React from 'react'
import {Link} from 'react-router-dom'


function Home() {
  return (
    <div>
        <center>
          <br />
          <h1>Home Page!</h1>
      {/* <Link to="/">Home</Link><br /> */}
      Already have an account?<Link to="/login">  Login</Link><br />
      New User?<Link to="/register">  Register</Link><br />
      
        </center>
        <div
      style={{
        width: "300px",                       // size
        height: "180px",
        backgroundColor: "rgba(255, 255, 255, 0.3)", // white with 30% opacity
        position: "absolute",                 // positioning
        top: "350px",                          // distance from top
        left: "100px",                          // distance from left
        padding: "20px",
        borderRadius: "12px",                  // rounded corners
        color: "black",                        // text color
        fontWeight: "bold",
        backdropFilter: "blur(8px)",           // frosted glass effect
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)" // optional shadow
      }}
    >
      <h1>ABOUT</h1>
      <p><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This app is about fetching the weather data of a specific city by entering the city name!</i></p>
    </div>

    </div>
  )
}

export default Home
