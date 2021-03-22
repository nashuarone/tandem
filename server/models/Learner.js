const { Schema, model, ObjectId } = require('mongoose')

const Learner = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  myname: { type: String, required: true },
  surname: { type: String, required: true },
  diskSpace: { type: Number, default: 1024 ** 3 / 2 },
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  phone: { type: String },
  gender: { type: String },
  birthDay: { type: Date },
  files: [{ type: ObjectId, ref: "File" }],
});

module.exports = model("Learner", Learner);
