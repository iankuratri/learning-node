const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// route parameters
// apiUrl: "/api/courses/1"
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with given ID not found on the server.");
  res.send(course);
});

// apiUrl: "/api/posts/2018/1"
// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.params);
// });

// query params
// apiUrl: "/api/posts/2018/1?sortBy=name"
app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
