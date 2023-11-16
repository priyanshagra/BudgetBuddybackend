const connectToMongo = require('./db');
const express=require("express");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");


connectToMongo();
let cors= require("cors");

const app=express();
const port=process.env.PORT || 8000;


app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello world");  
})

app.use('/api/auth', require('./routes/auth')),
app.use('/api/stocks', require('./routes/stock'))
app.use('/api/transaction', require('./routes/transaction'))
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


app.listen(port,()=>{
    console.log(`Trendy Tone the application is started succesfully on ${port}`);
})
