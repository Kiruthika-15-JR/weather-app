import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Weather from "./components/Weather";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Home></Home>,
       // errorElement:<Error/>
    },
    {
        path:"/login",
        element:<Login></Login>
    },
    {
        path:"/register",
        element:<Register></Register>
    },
    {
        path:"/dashboard",
        element:<Dashboard></Dashboard>
    },
     {
        path:"/logout",
        element:<Logout></Logout>
    },
    {
        path:"/weather",
        element:<Weather></Weather>
    }
    
])

export default router;