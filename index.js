const connectToMongo = require('./db');
const express=require("express");

connectToMongo();
let cors= require("cors");

const app=express();
const port=process.env.PORT || 8000;


app.us-e(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello world");  
})

app.use('/api/auth', require('./routes/auth'))

app.use('/api/transaction', require('./routes/transaction'))

app.listen(port,()=>{
    console.log(`Trendy Tone the application is started succesfully on ${port}`);
})