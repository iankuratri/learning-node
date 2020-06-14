const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
    // author: { type: authorSchema, required: true },
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  /**
   * const course = await Course.findById(courseId);
   * course.author.name = "Mosh Hamedani";
   * course.save();
   */

  // update directly in db
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "Stephen Grider",
      },
    }
  );

  // $unset: { "author": "" }
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Jhon" }),
//   new Author({ name: "Bob" }),
// ]);

// updateAuthor("5ee5d66c9e882a373432913f");

// addAuthor("5ee64d29fdd0490e40e0947c", new Author({ name: "Stephen" }));

// removeAuthor("5ee64d29fdd0490e40e0947c", "5ee64f6db8535c244ce5ffad");
