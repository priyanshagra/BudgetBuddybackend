const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
     
        trim: true,
        maxLength: 50
    },
    maker:
    {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount: {
        type: Number,
        maxLength: 30,
        trim: true
    },
    currency: {
         type:String 
        },
    type: {
        type:String,
        default: "income"
    },
    date: {
        type: Date,
   
        maxLength: 20,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    }
}, {timestamps: true})

module.exports=mongoose.model('Income', IncomeSchema)