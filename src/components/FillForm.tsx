import React, { useState } from "react";
import CopyableLink from "./CopyableLink";

function FillForm(): React.JSX.Element {
  const [newText, setNewText] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newInitials, setNewInitials] = useState("");
  const [queryString, setQueryString] = useState(window.location.search);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newQueryString = `?text=${encodeURIComponent(newText)}&date=${encodeURIComponent(newDate)}&initials=${encodeURIComponent(newInitials)}`;
    window.history.pushState({}, "", newQueryString);
    setQueryString(newQueryString);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Text:
          <input type="text" value={newText} onChange={(event) => setNewText(event.target.value)} />
        </label>
        <br />
        <label>
          Date:
          <input type="datetime-local" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </label>
        <br />
        <label>
          Initials:
          <input type="text" value={newInitials} onChange={(event) => setNewInitials(event.target.value)} />
        </label>
        <br />
        <button type="submit">Update Query String</button>
      
      <div>
        <h2>Query String:</h2>
        <CopyableLink link={queryString} wrap={false} />
      </div>
      </form>
    </div>
  );
}

export default FillForm;