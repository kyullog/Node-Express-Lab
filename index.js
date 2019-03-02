const express = require("express");
const db = require("./data/db.js");

const server = express();
const PORT = "2525";

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
