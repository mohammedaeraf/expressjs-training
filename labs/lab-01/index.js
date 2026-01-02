const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/users.routes");

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Express Backend App");
});

app.listen(3000, () => {
  console.log("Backend Express JS Server started at Port 3000");
});

// app.get("/", (request, response) => {
//   response.send(
//     "Welcome to first Express App! It's going to be fun and exciting"
//   );
// });

// app.get("/about", (request, response) => {
//   response.send(
//     "About Express JS.. Express JS is a framework to create backend"
//   );
// });

// app.get("/users", (request, response) => {
//   response.json([
//     {
//       id: 1,
//       name: "Aeraf",
//     },
//     {
//       id: 2,
//       name: "Nadeem",
//     },
//   ]);
// });
