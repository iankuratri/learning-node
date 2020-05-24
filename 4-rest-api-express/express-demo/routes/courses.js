const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

// route parameters
// apiUrl: "/api/courses/1"
router.get("/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

// apiUrl: "/api/posts/2018/1"
// router.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.params);
// });

// query params
// apiUrl: "/api/posts/2018/1?sortBy=name"
// router.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });

// post request
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// delete request
router.delete("/:id", (req, res) => {
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

module.exports = router;
