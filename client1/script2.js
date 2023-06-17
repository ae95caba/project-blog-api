const container = document.getElementById("container");
console.log("script runing");

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
    comments.forEach((comment) => {
      const p = document.createElement("div");
      p.innerText = comment.content;
      container.append(p);
    });

    // Process the data or perform other operations
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getPosts() {
  try {
    let response = await fetch(`http://localhost:3000/posts`);
    if (!response.ok) {
      throw new Error("Request failed");
    }

    let posts = await response.json();
    console.log(`the posts content is : ${posts}`);
    posts.forEach((post) => {
      const divPost = document.createElement("div");
      const pContent = document.createElement("p");
      const ptitle = document.createElement("h1");

      ptitle.innerText = post.title;
      pContent.innerText = post.content;
      divPost.append(ptitle, pContent);
      container.append(divPost);
    });

    // Process the data or perform other operations
  } catch (error) {
    console.error("Error:", error);
  }
}

getPosts();
