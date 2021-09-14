import React, { useState, useEffect } from "react";
import Axios from "axios";
import EditBlog from "./EditBlog";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import BlogDetail from "./BlogDetail";

function Home() {
  let history = useHistory();
  useEffect(() => {
    getBlogs();
  }, []);

  const [blogs, setBlogs] = useState([""]);
  const [showRm, setShowRm] = useState(false);
  const [maxCount, setMaxCount] = useState(5);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const getBlogs = async () => {
    await Axios.get("/blog").then((res) => {
      console.log(res.data.data);
      setBlogs(res.data.data.reverse());
      setTotalBlogs(res.data.data.length);
      if (res.data.data.length > 5) setShowRm(true);
      else setShowRm(false);
    });
  };

  const deleteBlogs = async (id) => {
    await Axios.delete("/blog/" + id)
      .then((res) => {
        getBlogs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {blogs.slice(0, maxCount).map((blog, index) => {
        return (
          <div key={index}>
            <h3>{blog.title}</h3>
            <p>{blog.content ? blog.content.substring(0, 100) + "..." : ""}</p>
            <Button
              onClick={() => {
                history.push("/edit/" + blog._id);
              }}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteBlogs(blog._id);
              }}
            >
              Delete
            </Button>
            <Button
              variant="warning"
              onClick={() => {
                history.push("/blog/" + blog._id);
              }}
            >
              Read More
            </Button>
          </div>
        );
      })}

      {showRm ? (
        <Button
          variant="dark"
          onClick={() => {
            setMaxCount(maxCount + 5);
            if (maxCount + 5 === totalBlogs || totalBlogs < maxCount + 5)
              setShowRm(false);
          }}
        >
          Load More
        </Button>
      ) : null}
    </div>
  );
}

export default Home;
