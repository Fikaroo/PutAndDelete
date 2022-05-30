const express = require("express");
const app = express();
const port = 3000;
let users = require("./users.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`app litening on port ${port}`);
});

app.put("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userWithId = users.findIndex((user) => user.id === userId);

  if (userWithId !== -1) {
    const oldUser = users[userWithId];
    users[userWithId] = { ...oldUser, ...req.body };

    res.json(users[userWithId]);
  } else {
    res.status(404).json();
  }
});

app.delete("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.json(users);
});
