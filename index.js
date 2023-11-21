const connectToMongo = require('./db');
const express=require("express");

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
app.use("/api/chat", require("./routes/chatRoutes"))
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/request", require("./routes/request"));

const server =app.listen(port,()=>{
    console.log(`Trendy Tone the application is started succesfully on ${port}`);
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData);
    });
  });