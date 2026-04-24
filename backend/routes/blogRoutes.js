
const express = require("express");
const router = express.Router();
const Blogs = require("../models/Blogs");
const auth = require("../middleware/authMiddleware");

// ✅ Create Blog (attach user)
router.post("/", auth, async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔍 debug

    const { title, content } = req.body;

    // ✅ Validation
    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required"
      });
    }

    const blog = new Blogs({
      title,
      content,
      user: req.user.id
    });

    await blog.save();

    res.status(201).json(blog);

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get All Blogs
router.get("/", async (req, res) => {
  const blogs = await Blogs.find();
  res.json(blogs);
});

// ✅ Get Single Blog
router.get("/:id", async (req, res) => {
  const blog = await Blogs.findById(req.params.id);
  res.json(blog);
});

// ✅ Update Blog (only owner)
router.put("/:id", auth, async (req, res) => {
  const blog = await Blogs.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // 🔐 check ownership
  if (blog.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const updated = await Blogs.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

// ✅ Delete Blog (only owner)
router.delete("/:id", auth, async (req, res) => {
  const blog = await Blogs.findById(req.params.id);

console.log("BLOG USER:", blog.user.toString());
console.log("LOGGED USER:", req.user.id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  // 🔐 check ownership
  if (blog.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  await Blogs.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;


