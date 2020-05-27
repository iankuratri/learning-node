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

async function getCourses() {
  const courses = await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(courses);
}
getCourses();
