const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

// ✅ Import Blog Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

// ✅ 👉 ADD THESE TWO LINES HERE
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});