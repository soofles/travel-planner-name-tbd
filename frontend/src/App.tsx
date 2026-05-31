// import { useEffect, useState } from "react";
import "./App.css"
import LeftSidebar from "./components/LeftSidebar"
import CenterTimeline from "./components/CenterTimeline"
import RightSidebar from "./components/RightSidebar";

function App() {
  /* const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error(error);
        setMessage("Failed to connect");
      });
  }, []); */

  return (
    <div className="root-layout">
      <LeftSidebar/>
      <CenterTimeline/>
      <RightSidebar/>
    </div>
  );
}

export default App;