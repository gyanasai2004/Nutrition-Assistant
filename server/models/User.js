const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activityLevel: String,
  goal:{
    type:String,
    enum:["lose","maintain","gain"],
    default:"maintain",
  },
});

module.exports = mongoose.model("User", userSchema);