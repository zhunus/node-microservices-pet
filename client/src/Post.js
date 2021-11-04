import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

export default function Post({ post }) {
  return (
    <div
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
      key={post.id}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentCreate postId={post.id} />
        <CommentList comments={post.comments} />
      </div>
    </div>
  );
}
