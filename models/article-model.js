const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  author: String,
  title: String,
  content: String,
  category: String,
  created_at: Date,
  thumbnail_url: String,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
