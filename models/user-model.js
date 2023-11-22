const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone_number: String,
  profile_url: String,
  birth_date: Date,
  gender: String,
  consultations: [
    {
      schedule: Date,
      doctor: String,
      doctor_specialist: String,
      status: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
