import React from "react";
import Post from "./Post";

const PostList = ({ posts }) => {
  const renderedPosts = Object.values(posts).map((post) => (
    <Post key={post.id} post={post} />
  ));

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
