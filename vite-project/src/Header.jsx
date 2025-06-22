import { useState } from "react";
function Header({ searchQuery, setSearchQuery }) {
  const [query, setQuery] = useState("");

  function handleKeyDown(e) {
  if (e.key === "Enter") {
    setSearchQuery(query); 
  }
}

  return(
  <div className="header">
    <div className="lijeva">
      <h1>Bla bla</h1>
    </div>
    <div className="desna">
      <input type="text" placeholder="Search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}/>
      <button onClick={() => setSearchQuery(query)}></button>
    </div>
  </div>)
}

export default Header