const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("Express JS Backend running on http://localhost:3000");
});

app.get("/", (request, response) => {
  response.send("Welcome to Express JS!!");
});

app.get("/about", (request, response) => {
  response.send("Response from About API EndPoint!!");
});

app.get("/users", (request, response) => {
  response.json([
    {
      id: 100,
      name: "Nadeem Khan",
    },
    {
      id: 101,
      name: "Arif Attar",
    },
  ]);
});

app.get("/users/101", (request, response) => {
  response.json({
    id: 101,
    name: "Arif Attar",
  });
});
