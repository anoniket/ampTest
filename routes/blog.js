// Common initial line for all routes
const router = require("express").Router();

const Blog = require("../models/blog_model");

router.route("/").get((req, res) => {
  // The find method returns a promise - a list of all the users

  Blog.find()
    .then((blog) => res.json({ data: blog, success: true }))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const date = new Date();

  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    creationDate: date,
  });

  newBlog
    .save()
    .then(() => res.status(200).send("Blog added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json({ data: blog, success: true }))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:id").delete((req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.json("Blog deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  const date = new Date();
  Blog.findById(req.params.id)
    .then((blog) => {
      (blog.title = req.body.title),
        (blog.content = req.body.content),
        (blog.creationDate = date);

      blog
        .save()
        .then(() => res.status(200).send("Blog updated!"))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error" + err));
});

// common export for all routes
module.exports = router;
