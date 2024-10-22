import logo from "./Logo.png";
import "./App.css";
import TimeSince from "./components/TimeSince.tsx";
import { useEffect, useState } from "react";
import FillForm from "./components/FillForm.tsx";
//?text=I%20Love%20You%20Name&date=2024-02-09T04%3A35%3A00&initials=Initials&color=%23220015

//LoveLapse
function App(): React.JSX.Element {
  const [queryText, setQueryText] = useState("Love You ya Basbosty");
  const [date, setDate] = useState("2024-02-09T04:35:00");
  const [initials, setInitials] = useState("ILY");
  const [bgColor, setBgColor] = useState("#220015"); // Default background color

  const updateStateFromQuery = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const text = queryParams.get("text");
    const dateString = queryParams.get("date");
    const initialsString = queryParams.get("initials");
    const colorString = queryParams.get("color");

    if (text) setQueryText(text);
    if (dateString) setDate(dateString);
    if (initialsString) setInitials(initialsString);
    if (colorString) setBgColor("#" + colorString.replace('#', ''));
  };

  useEffect(() => {
    // Initial state update on component mount
    updateStateFromQuery();

    // Polling mechanism to check for URL changes every 500ms
    const intervalId = setInterval(() => {
      updateStateFromQuery();
    }, 500);

    // Cleanup interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const specificDate = new Date(date).toISOString();

  return (
    <div className="App">
      <div className="Main-container" style={{ backgroundColor: bgColor }}>
        <div className="content-wrapper">
          {/* Left Side: Logo and Counter */}
          <div className="counter-side">
            <div className="logo-container">
              <div className="behind-logo">{initials}</div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <div className="content-container">
              <p className="text">We have spent:</p>
              <div>
                <TimeSince date={specificDate} />
              </div>
              <p className="text">{queryText} ❤️</p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="form-side">
            <FillForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
