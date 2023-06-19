import { useRef } from "react";

export default function Signup() {
  const dialogRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
        password: passwordRef.current.value,
      }),
    };

    let response = await fetch(`http://localhost:3000/signup`, requestOptions);

    if (response.ok) {
      alert("account created");
      closeDialog();
    } else {
      alert(response.statusText);
    }
  }

  return (
    <div>
      <button onClick={openDialog}>Signup</button>

      <dialog ref={dialogRef}>
        <h2>Sign up</h2>

        <form id="signup-form" onSubmit={handleSubmit}>
          <input ref={usernameRef} placeholder="user name" required />
          <input ref={passwordRef} placeholder="password" required />
        </form>
        <div>
          <button type="submit" form="signup-form">
            Accept
          </button>
          <button onClick={closeDialog}>Close</button>
        </div>
      </dialog>
    </div>
  );
}
