export default function Comment({ comment, getComments }) {
  async function deleteComment() {
    try {
      const fetchOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const request = await fetch(
        `http://localhost:3000/posts/${comment.post}/comments/${comment._id}`,
        fetchOptions
      );
      if (!request.ok) {
        alert("response not ok");
      } else {
        alert("response ok");
        getComments();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="comment">
      <p>{comment.content}</p>
      <p>{comment.timestamp}</p>
      <p>user: {comment.username}</p>
      <button onClick={deleteComment}>Delete</button>
    </div>
  );
}
