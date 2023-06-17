import Modal from "./Modal";
import { useState, useEffect } from "react";

export default function Post({ post }) {
  const [comments, setComments] = useState(null);

  //fetches the comments
  useEffect(() => {
    async function getComments(post) {
      try {
        let response = await fetch(
          `http://localhost:3000/posts/${post.id}/comments`
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }

        let comments = await response.json();
        console.log(`the comments content is : ${comments}`);
        setComments(comments);

        // Process the data or perform other operations
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getComments(post);
  }, []);
  return (
    <div key={post.id} className="post">
      <div className="header">
        <h1>{post.title}</h1>
        <p>{post.timestamp}</p>
      </div>
      <p>{post.content}</p>
      <Modal comments={comments} />
    </div>
  );
}
