// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import logo from "./Logo.png";

//?text=I%20Love%20You%20Name&date=2024-02-09T04%3A35%3A00&initials=Initials
import "./App.css";
import TimeSince from "./TimeSince";
import { useEffect, useState } from "react";

function App(): React.JSX.Element {
  let specificDate = new Date("2024-02-09T04:35:00").toISOString(); // Convert Date object to ISO string
  const [queryText, setQueryText] = useState("Love You ya Basbosty");
  const [date, setDate] = useState("2024-02-09T04:35:00");
  const [initials, setInitials] = useState("ILY");

  useEffect(() => {
    // Get the query string from the URL
    const queryParams = new URLSearchParams(window.location.search);
    // Get the value of the 'text' parameter from the query string
    const text = queryParams.get("text");
    const dateString = queryParams.get("date");
    const initialsString = queryParams.get("initials");
    // Update the state with the text from the query string
    if (text) {
      setQueryText(text);
    }
    if (dateString) {
      setDate(dateString);
    }
    if (initialsString) {
      setInitials(initialsString);
    }
    console.log("test date" + date);
    console.log("test queryText" + queryText);
  }, []); // Run this effect only once, on component mount
  if (date) {
    specificDate = new Date(date).toISOString(); // Convert Date object to ISO string
  }

  // const specificDate = new Date(date).toISOString(); // Convert Date object to ISO string

  return (
    <div className="App">
      <header className="Main-container">
        <div className="logo-container">
          <div className="behind-logo">{initials}</div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="text">We have spent:</p>
        <div>
          <TimeSince date={specificDate} />
        </div>
        <p className="text">{queryText} ❤️</p>
      </header>
    </div>
  );
}

export default App;
