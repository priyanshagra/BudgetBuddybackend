const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/User");
const Request = require("../models/request");

const createrequest = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.money || !req.body.chatid) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  try {
    const request = await Request.create({
      paidby: req.header("auth-token"),
      paidfor: req.body.users,
      money: req.body.money,
      chatid: req.body.chatid,
    });
    res.status(200).json("done");
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchrequest = asyncHandler(async (req, res) => {
    const chatid=req.header("auth-token");
    try {
        const data=await Request.find({chatid})
          .sort({ updatedAt: -1 }).populate("paidfor", "-password")
          res.status(200).json(data);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
});

const removerequest = asyncHandler(async (req, res) => {
    const { reqId, userId } = req.body;
  
    // check if the requester is admin
  
    const removed = await Request.findByIdAndUpdate(
      reqId,
      {
        $pull: { paidfor: userId },
      },
      {
        new: true,
      }
    )
    if (!removed) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.json(removed);
    }
  });

module.exports = {
  createrequest,
  fetchrequest,
  removerequest
};
