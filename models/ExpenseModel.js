const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
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
        required: true,
        maxLength: 30,
        trim: true
    },
    type: {
        type:String,
        default: "expense",
    },
    date: {
        type: Date,
        required: true,
        maxLength: 20,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    currency: { 
        type:String
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    }
}, {timestamps: true})

module.exports=mongoose.model('Expense', ExpenseSchema)