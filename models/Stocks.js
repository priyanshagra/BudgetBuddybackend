const mongoose = require('mongoose');
const { Schema } = mongoose;

const StocksSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    coinid:{
        type:String,
        required:true
    }
    }
);

const User=mongoose.model('stocks',StocksSchema);
module.exports = User;