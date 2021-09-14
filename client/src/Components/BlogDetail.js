import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function BlogDetail(props) {
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

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
