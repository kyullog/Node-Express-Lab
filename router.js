const express = require("express");

const db = require("./data/db.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(notes => {
      console.log(notes);
      res.status(200).json(notes);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const noteID = req.params.id;
  db.findById(noteID)
    .then(note => {
      if (note.length) {
        res.status(200).json(note);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    });
});

module.exports = router;
