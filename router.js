const express = require("express");

const db = require("./data/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("The router is working");
  res.status(200).json("The response is working");
});

module.exports = router;
