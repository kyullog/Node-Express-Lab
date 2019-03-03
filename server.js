const express = require("express");

const server = express();
const router = require("./router.js");
const cors = require("cors");

server.use(express.json());
server.use(cors());
server.use("/api/posts", router);

module.exports = server;
