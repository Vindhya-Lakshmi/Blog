const express = require("express");
const router = express.Router();

// 🤖 Generate Blog (FREE mock AI)
router.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const fakeContent = `
📘 Blog on ${topic}

${topic} is an important concept in modern development.

It helps developers build efficient and scalable applications.

Key points:
- Easy to use
- Improves performance
- Widely used in industry

Conclusion:
Learning ${topic} will boost your development skills 🚀
`;

    res.json({ content: fakeContent });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;