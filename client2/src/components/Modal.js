import { useRef, useState } from "react";

export default function Modal({ comments, post }) {
  console.log(`the post id is ${post.id}`);
  console.log(typeof post.id);

  const [errors, setErrors] = useState(null);

  const dialogRef = useRef(null);
  const usernameRef = useRef(null);
  const commentRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameRef.current.value,
        content: commentRef.current.value,
        post: post._id,
        timestamp: new Date(),
      }),
    };

    let response = await fetch(
      `http://localhost:3000/posts/${post._id}/comments`,
      requestOptions
    );

    if (response.ok) {
      closeDialog();
    } else {
      // Handle error response
      alert(response.statusText);
    }
  }

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>

      <dialog ref={dialogRef}>
        <h2>Comments:</h2>

        <ul>
          {comments?.map((comment) => (
            <li>
              <div className="comment">
                <p>{comment?.content}</p> <p>By : {comment?.username}</p>
              </div>
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input placeholder="your name" ref={usernameRef} required />
          <textarea required ref={commentRef}>
            Hola
          </textarea>
          <button type="submit">Add comment</button>
        </form>

        {errors?.map((error) => (
          <p>error.message</p>
        ))}

        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
}
