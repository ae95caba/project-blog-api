import { useState, useEffect, useRef } from "react";
import Comment from "./Comment";

export default function Post({ post, index, getPosts }) {
  const [editModeOn, setEditModeOn] = useState(false);
  const [inputTitle, setInputTitle] = useState(post.title);
  const [inputContent, setInputContent] = useState(post.content);
  const [comments, setComments] = useState(null);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) getComments();
  }, [showComments]);

  async function getComments() {
    console.log(`the post id conent is  ${JSON.stringify(post._id)}`);
    console.log("--------");
    try {
      let response = await fetch(
        `http://localhost:3000/posts/${post._id}/comments`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }

      let comments = await response.json();
      console.log(`the comments lenght is ${comments.length}`);
      console.log(JSON.stringify(comments));
      console.log(`the comments content is : ${comments}`);
      setComments(comments);

      // Process the data or perform other operations
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function deletePost() {
    try {
      const token = JSON.parse(localStorage.getItem("jwtToken")).token;
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
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
        alert(`response not ok : ${response.statusText}`);
        console.log("post not deleted");
      }
    } catch (error) {
      console.log("error");
    }
  }

  async function editPost(options = {}) {
    try {
      const token = JSON.parse(localStorage.getItem("jwtToken")).token;
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: options.content ? options.content : post.content,
          published:
            options.published !== undefined ? !post.published : post.published,
          title: options.title ? options.title : post.title,
          timestamp: post.timestamp,
        }), // Set the body content
      };
      const response = await fetch(
        `http://localhost:3000/posts/${post._id}`,
        fetchOptions
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
      <p>{post.timestamp}</p>
      {editModeOn ? (
        <input
          value={inputTitle}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
        />
      ) : (
        <p>{post.title}</p>
      )}
      {editModeOn ? (
        <input
          value={inputContent}
          onChange={(e) => {
            setInputContent(e.target.value);
          }}
        />
      ) : (
        <p>{post.content}</p>
      )}
      <div>
        <button onClick={deletePost}>Delete</button>
        <button onClick={() => editPost({ published: true })}>
          {post.published ? "Published" : "Not published"}
        </button>
        {editModeOn ? (
          <button
            onClick={() => {
              setEditModeOn(false);
              editPost({
                content: inputContent,
                title: inputTitle,
              });
            }}
          >
            Acept edit
          </button>
        ) : (
          <button onClick={() => setEditModeOn(true)}>Edit</button>
        )}
      </div>
      {showComments ? (
        comments?.length > 0 ? (
          <div className="comments-container">
            {comments.map((comment) => (
              <Comment comment={comment} getComments={getComments} />
            ))}
          </div>
        ) : (
          "No comments"
        )
      ) : (
        ""
      )}

      {showComments ? (
        <button onClick={() => setShowComments(false)}>Hide Comments</button>
      ) : (
        <button onClick={() => setShowComments(true)}>Show comments</button>
      )}
    </div>
  );
}
