app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userObj = users.find((user) => user.id == id);
  if (!userObj) {
    res.statusCode = 404;
    res.json({ message: "User Not Found" });
  }
  res.json(userObj);
});

app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userReq = req.body;
  const userObj = users.find((user) => user.id == id);
  if (!userObj) {
    res.statusCode = 404;
    res.json({ message: "User Not Found" });
  }

  userObj.name = userReq.name;
  userObj.email = userReq.email;

  res.json({ message: "User updated successfully", user: userObj });
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userObj = users.find((user) => user.id == id);
  if (!userObj) {
    res.statusCode = 404;
    res.json({ message: "User Not Found" });
  }
  const index = users.indexOf(userObj);
  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});
