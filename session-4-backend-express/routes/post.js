const express = require("express");
const router = express.Router();

const posts = new Map();

// POST /post/:user
router.post("/:user", (req, res) => {
  const body = req.body;
  const key = req.params.user + "/" + body.name;

  if (posts.has(key)) {
    res.status(400); // Bad Request
    res.json({ message: "Post already exists" });
    return;
  }

  posts.set(key, {
    name: body.name,
    content: body.content
  });
  res.status(201); // Created
  res.json({ message: "Post created" });
});

// GET /post/:user/:post
router.get("/:user/:post", (req, res) => {
  const postObj = posts.get(req.params.user + "/" + req.params.post);
  if (postObj !== undefined) {
    res.json(postObj);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: "Post not found" });
  }
});

module.exports = router;
