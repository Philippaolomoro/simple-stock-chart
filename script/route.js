const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/cryptoData", controller.getData);

module.exports = router;
