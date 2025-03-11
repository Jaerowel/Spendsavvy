const express  = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.get("/",(req,res) => {
    res.send("Spend Savvy API is running");
})
app.post("/login",( req,res) => {
    const {username,password} = req.body;

    console.log("Login attempt" , username , password);

    if (username == "kyle" && password === "1234"){
        res.json({ success: true, message: "Login Successful!"});
    
    }else{

        res.json({success:false, message:" invalid credentials!"});
    }
});
//server starter
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})