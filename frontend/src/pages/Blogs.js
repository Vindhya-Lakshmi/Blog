import { useEffect, useState } from "react";
import API from "../services/api";
import "../style/blog.css";
import { useNavigate } from "react-router-dom";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  } else {
    fetchBlogs();
  }
}, [navigate]);



  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      console.log("API RESPONSE:", res.data);
      setBlogs(res.data || []);
    } catch (err) {
      console.log(err);
      setBlogs([]);
    }
  };

  // 🤖 Generate Blog
  const generateBlog = async () => {
    try {
      const res = await API.post("/ai/generate", { topic });
      setContent(res.data.content);
    } catch (err) {
      alert("AI failed ❌");
    }
  };

 // ✅ Create Blog
const createBlog = async () => {
  // 🔥 validation
  if (!title || !content) {
    alert("Title and content required ⚠️");
    return;
  }

  try {
    await API.post("/blogs", { title, content });
    setTitle("");
    setContent("");
    fetchBlogs();
  } catch (err) {
    console.log(err.response?.data);
    alert("Create failed ❌");
  }
  
};

  // ✅ Delete
  const deleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert("Not allowed ❌");
    }
  };

  // ✅ Edit
  const startEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  // ✅ Update
  const updateBlog = async () => {
    try {
      await API.put(`/blogs/${editingId}`, { title, content });
      setEditingId(null);
      setTitle("");
      setContent("");
      fetchBlogs();
    } catch (err) {
      alert("Not allowed ❌");
    }
  };


 return (
  <div className="container">

    {/* Header */}
    <div className="header">
      <h1 className="heading">Blog Dashboard</h1>

      <button
        className="btn delete"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>

    {/* AI Section */}
    <div className="card">
      <h3>Generate Blog with AI</h3>
      <input
        className="input"
        placeholder="Enter topic (e.g. React, AI)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button className="btn ai" onClick={generateBlog}>
        Generate ✨
      </button>
    </div>

    {/* Create / Edit */}
    <div className="card">
      <h3>{editingId ? "Edit Blog" : "Create Blog"}</h3>

      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="textarea"
        placeholder="Write your blog..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {editingId ? (
        <button className="btn update" onClick={updateBlog}>
          Update
        </button>
      ) : (
        <button
          className="btn create"
          onClick={createBlog}
          disabled={!title || !content}
        >
          Create
        </button>
      )}
    </div>

    {/* Blog List */}
    <div className="blogs">
      <h2>All Blogs</h2>

      {blogs?.map((b) => (
        <div className="blog-card" key={b._id}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>

          <div className="actions">
            <button className="btn edit" onClick={() => startEdit(b)}>
              Edit
            </button>
            <button className="btn delete" onClick={() => deleteBlog(b._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>

  </div>
);
}

export default Blogs;