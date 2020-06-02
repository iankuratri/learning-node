const mongoose = require("mongoose");

// Connecting to mongoDB
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Schema
const courseSchema = new mongoose.Schema({
  // mongoose validation
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
    required: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "A course should have atleast one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 10,
    max: 100,
    required: function () {
      return this.isPublished;
    },
  },
});

// Model
const Course = mongoose.model("Course", courseSchema);

// For creating a course
async function createCourse() {
  // Object based on Course class
  const course = new Course({
    name: "Angular course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 10,
    category: "web",
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
createCourse();

async function getCourse() {
  /**
   * Comparisson Query Operators
   *
   * eq (equal)
   * ne (not equal)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt (less than)
   * lte (less than or equal to)
   * in
   * nin (not in)
   *
   * courses with price gte 10 and lte 20
   * .find({ price: { $gte: 10, $lte: 20 } })
   *
   * courses with price 10, 20 and 30
   * .find({ price: { $in: [10, 20, 30] } })
   */

  /**
   * Logical Query Operators
   *
   * or
   * and
   *
   * courses with author mosh or isPublished true
   * .find()
   * .or([{ author: "Mosh", isPublished: true }])
   *
   * courses with author mosh and isPublished true
   * .find()
   * .and([{ author: "Mosh", isPublished: true }])
   */

  // Regular Expressions

  // Starts with Mosh (use ^ in beginning)
  // .find({ author: /^Mosh/ })

  // Ends with Hamedani (use $ in end)
  // .find({ author: /Hamedani$/ })

  // Contains Mosh (use .* in begining and end, i to ignore case sensitivity)
  // .find({ author: /.*Mosh.*/i })

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  /**
   * To get the number of documents found
   * .countDocuments();
   */

  /**
   * For pagination
   *
   * const pageNumber = 2;
   * const pageSize = 10;
   *
   * .skip((pageNumber - 1) * pageSize)
   * .limit(pageSize)
   */

  console.log(courses);
}

// getCourse();

async function updateCourse(id) {
  /**
   * Approach: Query first
   * findById()
   * Modify its properties
   * save()
   */

  // try {
  //   const course = await Course.findById(id);

  //   course.set({
  //     name: "React Course",
  //     author: "Stephen Grider",
  //   });

  //   const result = await course.save();
  //   console.log(result);
  // } catch (err) {
  //   console.log("Error:", err.message);
  // }

  /**
   * Approach: Update first
   * Update directly
   * Optionally: get the updated document
   */

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          name: "Redux Course",
          author: "Mosh Hamedani",
        },
      },
      { new: true }
    );

    console.log(course);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

// updateCourse("5ecccc75c2e3101f60aa22c7");

async function removeCourse(id) {
  /**
   * can use these too
   *
   * deleteMany()
   * findByIdAndRemove()
   */
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// removeCourse("5ecccc75c2e3101f60aa22c7");
