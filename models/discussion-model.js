const mongoose = require("mongoose");
const { Schema } = mongoose;

const discussionSchema = new Schema({
  author: String,
  author_avatar_url: String,
  question: String,
  tags: Array,
  liked: Number,
  created_at: Date,
  comments: [
    {
      author: String,
      comment: String,
      author_avatar_url: String,
      created_at: Date,
    },
  ],
});

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;
