const express = require("express");
const app = express();
const port = 3000;
const ExpressError = require("./expressError");

// logger via middleware
// app.use((req,res,next)=>{
//     req.responseTime = new Date(Date.now()).toString();
//     console.log(req.method, req.path, req.responseTime, req.hostname);
//     next();
// });

const checkToken =  (req,res,next)=>{
    console.log("1.first goes to the /api route via middleware")
    let {token} = req.query;
    console.log("2. checks the token which comes from the request")
    if(token === 'giveaccess'){
        console.log("3. Yes the token is correct..!");
        next();
    }
    console.log("3'token is incorrect!")
    throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/", (req,res)=>{
    res.send("This is root page");
});

app.get("/api",checkToken, (req,res)=>{
    console.log("4. prints the data cause the token is correct..!")
    res.send("data");
});


app.get("/err",(req,res)=>{
    aghjd= aghfjd;
});
let checkAdmin = (req,res,next)=>{
    let {password} = req.query;
    if(password == "admin"){     
        next();
    }
    throw new ExpressError(403,"Unauthorized access Denied.!");
}
app.get("/admin",checkAdmin, (req,res)=>{
    res.send("Welcome, Admin");
});

app.use((err,req,res,next)=>{
    console.log("4'.Sending the error message to the client..!");
   let{status=500, message="Found error"}  = err;
   res.status(status).send(message);
});

 

app.listen(port, (req,res)=>{
    console.log("Server is running at port", 3000);
});