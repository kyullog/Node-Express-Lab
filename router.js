const express = require("express");

const db = require("./data/db.js");

const router = express.Router();

router.post("/", (req, res) => {
  const post = req.body;
  if (!post.title || !post.contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post" });
  } else {
    db.insert(post)
      .then(response => {
        db.findById(response.id)
          .then(response => {
            res.status(201).json(response);
          })
          .catch(err =>
            res.status(500).json({
              error: "There was an error retriving your newly created post"
            })
          );
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

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
