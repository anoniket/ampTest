import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddBlog from "./Components/AddBlog";
import BlogDetail from "./Components/BlogDetail";
import EditBlog from "./Components/EditBlog";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/edit/:xyz" component={EditBlog} />
      <Route path="/add" component={AddBlog} />
      <Route path="/blog/:xyz" component={BlogDetail} />

      {/* <Route path="/about" component={About} />
       <Route path="/compose" component={Composetest} />
       <Route path="/contact" component={Contact} />
       <Route path="/post/:xyz" component={Post} />
       
       <Route path="/weather" component={Weather} />
       <Route path="/profile" component={ProfileTest} />
       <Route path="/admint" component={Testing} />
        */}
    </Router>
  );
}

export default App;
