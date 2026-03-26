const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// 🔗 Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});