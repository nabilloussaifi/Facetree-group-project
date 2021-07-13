const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
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
    type: String,

  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
