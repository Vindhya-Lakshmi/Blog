const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// ✅ Create Blog
router.post("/", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// ✅ Get Single Blog
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// ✅ Update Blog
router.put("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// ✅ Delete Blog
router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;