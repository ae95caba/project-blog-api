import { useState, useEffect } from "react";
import Signup from "./Signup";
export default function Home() {
  const [userOnline, isUserOnline] = useState(false);

  return (
    <div>
      Home
      {!userOnline ? <Signup /> : ""}
    </div>
  );
}
