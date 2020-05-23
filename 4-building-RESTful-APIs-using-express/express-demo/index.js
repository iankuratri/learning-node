const Joi = require("@hapi/joi");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const express = require("express");
const app = express();

// built-in middleware function

// It parses incoming requests with JSON payloads
app.use(express.json());
// It parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// It serves static files
app.use(express.static("public"));

// custom middleware fucntion

app.use(logger);
app.use(authenticate);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// get requests

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// route parameters

// apiUrl: "/api/courses/1"
app.get("/api/courses/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
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

// post request

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// put request

app.put("/api/courses/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// delete request

app.delete("/api/courses/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

// common functions

function findCourse(id) {
  return courses.find((c) => c.id === parseInt(id));
}

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
