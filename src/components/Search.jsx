import { useState } from "react";

const Search = (charactersData) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Load charactersData from API or other source

  return (
    <>
      <p>Find Star Wars characters</p>
      <input
        type="text"
        placeholder="Search by character name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
};

export default Search;
