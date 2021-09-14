import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function AddBlog() {
  let history = useHistory();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  function handleInput(event) {
    setBlog({
      ...blog,
      [event.target.name]: event.target.value,
    });
  }

  function formSubmit(e) {
    e.preventDefault();

    Axios.post("/blog/add", blog)
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
      <h1>Add blog</h1>
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

export default AddBlog;
