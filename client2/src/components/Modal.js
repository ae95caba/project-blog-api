import { useRef } from "react";

export default function Modal({ comments }) {
  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <div>
      <button onClick={openDialog}>Open Dialog</button>

      <dialog ref={dialogRef}>
        <h2>Dialog Title</h2>
        <p>This is the content of the dialog.</p>

        <ul>
          {comments?.map((comment) => (
            <li>
              <div className="comment">
                <p>{comment?.content}</p> <p>{comment?.username}</p>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={closeDialog}>Close</button>
      </dialog>
    </div>
  );
}
