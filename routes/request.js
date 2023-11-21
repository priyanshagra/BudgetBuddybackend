const express = require("express");
const {
    createrequest,
  fetchrequest,
  removerequest
} = require("../controllers/requestControllers.js");

const router = express.Router();
router.route("/").post(createrequest);
router.route("/getreq").get(fetchrequest);
router.route("/rem").put(removerequest);

module.exports = router;