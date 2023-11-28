const mongoose = require("mongoose");
const { Schema } = mongoose;

const doctorSchema = new Schema({
  name: String,
  description: String,
  specialist: String,
  experience: Number,
  str_number: String,
  profile_url: String,
  price: Number,
  rating: Number,
  alumnus: String,
  graduate_year: String,
  practice_location: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
