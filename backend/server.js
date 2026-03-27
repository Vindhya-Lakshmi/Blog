const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

// ✅ Import Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});