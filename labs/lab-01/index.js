const express = require("express");
const app = express();
const port = 3000;

// Home route
app.get("/", (request, response) => {
  response.send(
    "Welcome to first Express App! It's going to be fun and exciting"
  );
});

app.get("/about", (request, response) => {
  response.send(
    "About Express JS.. Express JS is a framework to create backend"
  );
});

app.get("/users", (request, response) => {
  response.json([
    {
      id: 1,
      name: "Aeraf",
    },
    {
      id: 2,
      name: "Nadeem",
    },
  ]);
});

app.listen(3000, () => {
  console.log("Backend Express JS Server started at Port 3000");
});
