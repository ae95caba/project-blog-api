export default function Post({ post, index }) {
  function deletePost() {}

  return (
    <div className="post" key={index}>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}
