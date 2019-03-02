const express = require("express");

const server = express();
const router = require("./router.js");

server.use(express.json());

server.get("/", (req, res) => {
  console.log("1, 2, 1, 2 this is just a test");
  res.status(200).json("This is a test");
});

module.exports = server;
