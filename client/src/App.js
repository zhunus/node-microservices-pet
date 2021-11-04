import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  function onPostCreatedHandler(post) {
    setPosts({ ...posts, [post.id]: { ...post, comments: [] } });
  }

  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate onSubmitHandler={onPostCreatedHandler} />
      <hr />
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};
export default App;
