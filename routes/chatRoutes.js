const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");

const router = express.Router();
router.route("/").get( fetchChats);
router.route("/group").post( createGroupChat);
router.route("/").post( accessChat);
router.route("/rename").put( renameGroup);
router.route("/groupremove").put( removeFromGroup);
router.route("/groupadd").put(addToGroup);

module.exports = router;
