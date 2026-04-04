import { useEffect, useState } from "react";
import API from "../services/api";

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await API.get("/blogs");
    setBlogs(res.data);
  };

  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map((b) => (
        <div key={b._id}>
          <h3>{b.title}</h3>
          <p>{b.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Blogs;