import { useState, useEffect } from "react";
import Post from "./Post";

export default function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    async function getPosts() {
      try {
        let response = await fetch(`http://localhost:3000/posts`);
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
      {posts?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
