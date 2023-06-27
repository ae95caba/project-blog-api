import { useState, useEffect } from "react";

//fetches posts from api
export default function AdminDashboard() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    async function getPosts() {
      const token = JSON.parse(localStorage.getItem("jwtToken")).token;
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Add the JWT to the Authorization header
        },
      };
      try {
        let response = await fetch(
          `http://localhost:3000/posts`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Request failed");
        }

        let posts = await response.json();
        console.log(`the posts content is : ${posts}`);
        setPosts(posts);

        // Process the data or perform other operations
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getPosts();
  }, []);
  return (
    <div>
      <h1>admin shasboard</h1>

      <div id="posts">
        {posts?.map((post) => (
          <div>{post.title}</div>
        ))}
      </div>
    </div>
  );
}
