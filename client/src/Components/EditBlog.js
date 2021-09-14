import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function EditBlog(props) {
  let history = useHistory();
  useEffect(() => {
    getBlogs();
  }, []);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const getBlogs = async () => {
    await Axios.get("/blog/" + props.match.params.xyz)
      .then((res) => {
        setBlog({
          title: res.data.data.title,
          content: res.data.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleInput(event) {
    setBlog({
      ...blog,
      [event.target.name]: event.target.value,
    });
  }

  function formSubmit(e) {
    e.preventDefault();
    console.log(blog);

    Axios.post("/blog/update/" + props.match.params.xyz, blog)
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h1>Edit blog</h1>
      <form onSubmit={formSubmit}>
        <div className="form-group">
          <input
            placeholder="blog title"
            onChange={handleInput}
            name="title"
            value={blog.title}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="blog content"
            onChange={handleInput}
            name="content"
            value={blog.content}
            className="form-control"
            rows="3"
          ></textarea>
        </div>
        <Button variant="dark" type="submit">
          Proceed
        </Button>
      </form>
    </div>
  );
}

export default EditBlog;
