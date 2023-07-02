export default function Post({ post, index, getPosts }) {
  async function deletePost() {
    try {
      console.log("delete post function runing");
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      let response = await fetch(
        `http://localhost:3000/posts/${post._id}`,
        requestOptions
      );
      console.log(`the resonse status is  : ${response.status}`);
      alert(response.status);

      if (response.ok) {
        alert("post deleted");
        getPosts();
        console.log("post deleted ");
      } else {
        alert(`response not ok : ${response.statusTex}`);
        console.log("post not deleted");
      }
    } catch (error) {
      console.log("error");
    }
  }

  async function switchPublished() {
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: post.content,
          published: !post.published,
          title: post.title,
          timestamp: post.timestamp,
        }), // Set the body content
      };
      const response = await fetch(
        `http://localhost:3000/posts/${post._id}`,
        options
      );
      if (response.ok) {
        alert("post updated");
        console.log("post updated");
        getPosts();
      } else {
        alert(`response not ok : ${response.statusTex}`);
        console.log("post not updated");
      }
    } catch (error) {
      alert("error");
      console.log(error.message);
    }
  }
  return (
    <div className="post" key={index}>
      <p>{post.title}</p>
      <p>{post.content}</p>
      <button onClick={deletePost}>Delete</button>
      <button onClick={switchPublished}>
        {post.published ? "Published" : "Not published"}
      </button>
    </div>
  );
}
