import React, { useState } from "react";
import axios from "axios";

const PostCreate = ({ onSubmitHandler }) => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:4000/posts", {
      title,
    });

    onSubmitHandler(response.data);

    setTitle("");
  };

  return (
    <div>
      <form className="d-flex align-items-end" onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="mx-2 btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
