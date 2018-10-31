const express = require("express");
const router = express.Router();

const users = new Map();

router.post("/", (req, res) => {
  const body = req.body;
  if (users.has(body.name)) {
    res.status(400); // Bad Request
    res.json({ message: "User already exists" });
    return;
  }

  users.set(body.name, { name: body.name });
  res.status(201); // Created
  res.json({ message: "User created" });
});

router.get("/:user", (req, res) => {
  const userObj = users.get(req.params.user);
  if (userObj !== undefined) {
    res.json(userObj);
  } else {
    res.status(404); // Gives user a 404 Not Found error.
    res.json({ message: "User not found" });
  }
});

module.exports = router;
