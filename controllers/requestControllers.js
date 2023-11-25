const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/User");
const Request = require("../models/request");
const nodemailer = require("nodemailer");

const createrequest = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.money || !req.body.chatid) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  try {
    const request = await Request.create({
      paidby: req.header("auth-token"),
      paidfor: req.body.users,
      money: req.body.money,
      currency: req.body.currency,
      chatid: req.body.chatid,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "trendtonee@gmail.com",
        pass: "mznoxvotojeqgqyt",
      },
    });
    let str=   `Money to be paid of ${req.body.currency} ${req.body.money}`;
    for (let i = 0; i < req.body.users.length; i++) {
      if (req.body.users[i]._id != req.header("auth-token")) {
        const mailOptions = {
          from: '"BudgetBuddy" trendtonee@gmail.com',
          to: req.body.users[i].email,
          subject: "Pending money",
          text: str,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(500);
          }
        });
      }
    }

    res.status(200).json("done");
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const fetchrequest = asyncHandler(async (req, res) => {
  const chatid = req.header("auth-token");
  try {
    const data = await Request.find({ chatid })
      .sort({ updatedAt: -1 })
      .populate("paidfor", "-password");
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
  );
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
  removerequest,
};
