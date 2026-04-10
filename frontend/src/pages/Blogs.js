import { useEffect, useState } from "react";
import API from "../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  // ✅ Create Blog
  const createBlog = async () => {
    await API.post("/blogs", { title, content });
    setTitle("");
    setContent("");
    fetchBlogs();
  };

  // ✅ Delete Blog
  const deleteBlog = async (id) => {
    try {
      await API.delete(`/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      alert("Not allowed ❌");
    }
  };

  // ✅ Start Editing
  const startEdit = (blog) => {
    setEditingId(blog._id);
    setTitle(blog.title);
    setContent(blog.content);
  };

  // ✅ Update Blog
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
    <div>
      <h2>{editingId ? "Edit Blog" : "Create Blog"}</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <br />

      {editingId ? (
        <button onClick={updateBlog}>Update</button>
      ) : (
        <button onClick={createBlog}>Create</button>
      )}

      <hr />

      <h2>All Blogs</h2>
      {blogs.map((b) => (
        <div key={b._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>

          <button onClick={() => startEdit(b)}>Edit</button>
          <button onClick={() => deleteBlog(b._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Blogs;