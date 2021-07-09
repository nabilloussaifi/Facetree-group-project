const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  content: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
});
const Post = mongoose.model("post", PostSchema);

module.exports = Post;
