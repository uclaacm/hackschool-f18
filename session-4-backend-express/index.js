const express = require("express");

const userEndpoints = require("./routes/user.js");
const postEndpoints = require("./routes/post.js");

const app = express();

app.use(express.json());

app.use("/user", userEndpoints);

app.use("/post", postEndpoints);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
