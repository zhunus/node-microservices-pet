import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul className="my-2">{renderedComments}</ul>;
};

export default CommentList;
