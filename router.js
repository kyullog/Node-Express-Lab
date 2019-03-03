const express = require("express");

const db = require("./data/db.js");

const router = express.Router();

//get all the notes
router.get("/", async (req, res) => {
  try {
    const notes = await db.find();
    res.status(200).json(notes);
  } catch {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

//get a single note by it's ID
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

// router.post("/", (req, res) => {
//   const post = req.body;

//   //checks to see if the post has the required fields
//   if (!post.title || !post.contents) {
//     res
//       .status(400)
//       .json({ errorMessage: "Please provide title and contents for the post" });
//   } else {
//     db.insert(post)
//       .then(response => {
//         //returns the note created by the post request
//         db.findById(response.id)
//           .then(response => {
//             res.status(201).json(response);
//           })
//           .catch(err =>
//             res.status(500).json({
//               error: "There was an error retriving your newly created post"
//             })
//           );
//       })

//       //returns error if request went bad
//       .catch(err => {
//         res.status(500).json({
//           error: "There was an error while saving the post to the database"
//         });
//       });
//   }
// });

//refactored post method
router.post("/", async (req, res) => {
  try {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post"
      });
    } else {
      const success = await db.insert(newPost);
      if (success) {
        const displaySuccess = await db.findById(success);
        res.status(201).json(displaySuccess);
      } else {
        res
          .status(500)
          .json({ error: "There was a problem retrieving your new note" });
      }
    }
  } catch {
    res.status(500).json({
      error: "There was an error while saving the post to the database."
    });
  }
});

//delete a post using its ID number
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const success = await db.remove(id);
    if (success) {
      res.status(201).json({ message: "Post Deleted" });
    } else {
      res.status(404).json({ errorMessage: "Post does not exist by that ID" });
    }
  } catch {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

//edit an existing post using its ID number
router.put("/:id", async (req, res) => {
  try {
    const editID = req.params.id;
    const editPost = req.body;

    if (!editPost.title || !editPost.contents) {
      res.status(400).json({
        errorMessage: "Please provide the title and contents for the post."
      });
    } else {
      try {
        const success = await db.update(editID, editPost);
        if (success) {
          const editedNote = await db.findById(editID);
          res.status(200).json(editedNote);
        } else {
          res.status(404).json({
            message: "The post with the specified id does not exist."
          });
        }
      } catch {
        res
          .status(500)
          .json({ error: "There was an issue retrieving your modified note" });
      }
    }
  } catch {
    res
      .status(500)
      .json({ error: "The post information could not be modified" });
  }
});

module.exports = router;
