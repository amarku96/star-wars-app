import React from "react";

function FilterCharacters({
  characters,
  filterType,
  filterValue,
  searchQuery,
  onCardClick,
}) {
  // Filtering logic
  const filterCharacters = (characters, filterType, filterValue) => {
    return characters.filter((character) => {
      switch (filterType) {
        case "homeworld":
          return character.homeworld.name
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        // case "film":
        //   return character.films.some((film) =>
        //     film.toLowerCase().includes(filterValue.toLowerCase())
        //   );
        case "species":
          if (character.species) {
            return false; // No species data, exclude from results
          } else {
            return character.species.name
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
        default:
          return true; // No filter or unknown filter type
      }
    });
  };

  // Filter the characters based on the filterType and filterValue
  const filteredCharacters = filterCharacters(
    characters,
    filterType,
    filterValue
  );

  // Search logic
  const searchFilteredCharacters = filteredCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid-container">
      {searchFilteredCharacters.map((character) => (
        <div
          key={character.name}
          className="grid-item"
          onClick={() => onCardClick(character)}
        >
          {character.name}
        </div>
      ))}
    </div>
  );
}

export default FilterCharacters;
