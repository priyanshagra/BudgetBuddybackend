const express = require('express');
const router = express.Router();
const Stock = require('../models/Stocks');
const { body, validationResult } = require('express-validator');
const nodemailer=require('nodemailer');


router.get('/fetchallstocks',async(req,res)=>{
    let success=false;
    try {
        const stock = await Stock.find({user:req.header('auth-token')})
        success=true;
        res.json({stock,success});
        
    } catch (error){
        console.error(error.message);
        res.json({success});
    }
})

router.post('/addstocks',[
    body('user','Enter a valid user'),
    body('coinid','Enter coin id')
],async(req,res)=>{
    let success=false;
    try {
    const{user, coinid}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const stock= new Stock({
        user, coinid
    })
    const saveStock=await stock.save()
    success=true;
    res.json({saveStock,success});
} catch (error){
    console.error(error.message);
    res.json({success});
}
})

module.exports = router