import { useState, useEffect } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import AdminDashboard from "./AdminDashboard";
export default function Home() {
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [posts, setPosts] = useState(null);

  //at page load
  //if token at localStorage
  ////////use server to check it
  ////////if valid
  //////////////set isUserOnline to true
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      // check if token is valid
      //change state
      async function getPosts() {
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: usernameRef.current.value,
              password: passwordRef.current.value,
            }),
          };
          let response = await fetch(
            `http://localhost:3000/auth`,
            requestOptions
          );
          if (!response.ok) {
            throw new Error("Request failed");
          }
          console.log("auth succeded, setting user state to online!");
          setIsUserOnline(true);

          // Process the data or perform other operations
        } catch (error) {
          console.error("Error:", error);
        }
      }

      getPosts();
    }
  }, []);

  return (
    <div>
      Home
      {!isUserOnline ? (
        <div>
          <Signup /> <Signin setIsUserOnline={setIsUserOnline} />
        </div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}
