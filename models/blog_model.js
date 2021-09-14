const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },

    content: {
      type: String,
    },

    creationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// timestamps will auto-create date and time of account activity

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
