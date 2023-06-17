const container = document.getElementById("container");
console.log("script runing");
let comments;
async function getComments() {
  try {
    comments = await fetch("http://localhost:3000/comments");
    if (!comments.ok) {
      throw new Error("Request failed");
    }

    const data = await comments.json();
    console.log(`the data is : ${data}`);

    // Process the data or perform other operations
  } catch (error) {
    console.error("Error:", error);
  }
}

getComments();
