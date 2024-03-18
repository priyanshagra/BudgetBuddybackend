const connectToMongo = require('./db');
const express=require("express");
connectToMongo();
let cors= require("cors");

const path = require('path');

const shortid = require('shortid');

const Razorpay = require('razorpay');


const app=express();
const port=process.env.PORT || 8000;

const razorpay =  new Razorpay({
    key_id: "rzp_test_ATIDqpJJTUeTEw",
    key_secret:"Atf2j4yxFH1kmNqenFwGwp2w"

})

app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello world");  
})


app.get('/logo.jpg',(req,res)=>{
    res.sendFile(path.join(__dirname,"logo.jpg"))
})

app.post('/razorpay', async (req, res) => {
    const payment_capture = 1;
    const amount = 499;
    const currency = 'INR';
  
    // Create options for the order
    const options = {
      amount: amount * 100, // Amount should be in smallest currency unit (paise)
      currency: currency,
      receipt: shortid.generate(), // Generate a unique receipt ID
      payment_capture: payment_capture
    };
  
    try {
      // Create the order using Razorpay
      const response = await razorpay.orders.create(options);
  
      // Return order details to the client
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while creating the order' });
    }
  });
app.use('/api/auth', require('./routes/auth'))
app.use('/api/order', require('./routes/order'))

app.listen(port,()=>{
    console.log(`Trendy Tone the application is started succesfully on ${port}`);
})