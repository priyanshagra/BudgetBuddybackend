const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    paidby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    paidfor: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    chatid:{type:mongoose.Schema.Types.ObjectId, ref:"Chat"},
    money: { type:Number},
    currency: { type:String },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
