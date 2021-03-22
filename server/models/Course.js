const { Schema, model, ObjectId } = require("mongoose");

const Course = new Schema({
  title: { type: String, required: true },
  img: { type: String },
  videoLink: { type: String },
  eduFiles: [{ type: ObjectId, ref: "File" }],
  description: { type: String },
  shortDescription: { type: String },
  format: { type: String },
  duration: { type: String },
  creator: { type: ObjectId, ref: "Learner" },
});

module.exports = model("Course", Course);
