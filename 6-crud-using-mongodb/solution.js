const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/mongo-exercises", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db.."))
  .catch((err) => console.log("Cannot connect to db...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  date: Date,
  tags: [String],
  price: Number,
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

// exercise 1
async function getCourses1() {
  const courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(courses);
}
// getCourses1();

// exercise 2
async function getCourses2() {
  const courses = await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });

  /**
   * or we can use or logical operator
   * .find({ isPublished: true })
   * .or([ { tags: "frontend" }, { tags: "backend" } ])
   */

  console.log(courses);
}

// getCourses2();

// exercise 3
async function getCourses3() {
  const courses = await Course.find({
    isPublished: true,
  }).or([{ price: { $gte: 15 } }, { name: /.*by.*/ }]);

  console.log(courses);
}

// getCourses3();
