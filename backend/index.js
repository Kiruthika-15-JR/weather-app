

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config.json");
const session = require("client-sessions");//npm install client-sessions
const bcrypt = require("bcrypt");//npm install bcrypt


// app configuration
const app = express();
app.use(express.json());//parse json bodies

app.use(express.urlencoded({extended : "extended"}));



const cors = require("cors");
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials:true  
}
app.use(cors(corsOptions));//only the specified port (frontend) can access the backend...




app.use( session({//client-sessions
    cookieName: 'authdata', // cookie name.
    secret: 'ertghbvdsw34r5t6yuy6543wsdcvghyt654e3wsdft5r4w345tyhbvfdsw2345tgvc', // should be a large unguessable string(secret key for encrypt and decrypt the data)
    duration: 30 * 60 * 1000, // how long the session will stay valid in ms(30 mins here)
    activeDuration: 10 * 60 * 1000, //the session will be extended to sometime(in milliseconds[10 mins here]) if the user still has kept the browser/application opened even after the actual duration.
    cookie : {
        ephemeral : true//if the user closes the browser the cookie will be automatically deleted.
    }
}));

// global middleware; this middleware runs for every request.
app.use(function(req, res, next){
    if(req.authdata && req.authdata.user){
        Appuser.findOne({ email : req.authdata.user.email })
        .then(dbres => {
            req.authdata.user = req.registeredUser = dbres;
            next()
        })
        .catch(error => {
            next();
        })
    }else{
        next();
    }
})

let rawurl = "mongodb+srv://{{dbuser}}:{{pass}}@cluster0.{{dbstring}}.mongodb.net/{{dbname}}?retryWrites=true&w=majority&appName=Cluster0";
let url = rawurl
        .replace("{{dbuser}}",config.dbuser)
        .replace("{{pass}}",config.dbpass)
        .replace("{{dbstring}}",config.dbstring)
        .replace("{{dbname}}",config.dbname)
        

// model configuration
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
// ORM
let Appuser = mongoose.model("Appuser",new Schema({
    id : ObjectId,
    firstname : String,
    lastname : String,
    email : { type : String, unique : true },//email should be unique. "can also add required: true"
    password : String
}))

// db connection
mongoose.connect(url)
.then(()=> console.log("DB Connected"))
.catch((error)=> console.log("Error ", error));


app.post("/login",function(req, res){//post method is used in form(if form is submitted.....)
    Appuser.findOne({ email : req.body.email })//findOne-> searches the collection for a single document which matches the email.(all the data(id,name,password..) is retrieved which matches the email)
    .then(dbres => {//only one set of data is returned which matches the email.(id,password,name..)
        if(!dbres){
            return res.status(401).end();
        }
       
        if(bcrypt.compareSync(req.body.password, dbres.password)){//compares the requested password by the client with the dbres password.
            req.authdata.user = dbres; //stores dbres inside an encrypted cookie(session using client-sessions) on the client's browser.
            return res.status(200).end();//redirecting to profile page.
        }else{
            return res.status(401).end();//if the password is incorrect the login page is displayed and the error msg is sent to the login.pug from where the request is sent.
        }
    })
    .catch((error)=>{
       return res.status(500).end();//if email itself doesnot exists.
    })                       

})







app.post("/register", function(req, res){
    let hashpass = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)) //hash password is created for the client input password(req.body.password).
    let newappuser = new Appuser({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : hashpass,
    });
    newappuser
    .save()//saves the new user in the database.
    .then((dbres)=>{

        console.log("user is registered")
        return res.status(200).end();
        
    })
    .catch((error)=>{
        if (error.code === 11000) {  // duplicate key error
                console.log("User already exists!");
                return res.status(409).end();
            }
            console.log("Some other error:", error);
            return res.status(500).end();
    })
})



app.get("/logout", function(req, res){
    req.authdata.reset();//resetting the cookie
    res.end();
})


app.listen(5000,function(error){
    error ? console.log("Error ", error) : console.log("server is live on localhost:5000")
})


