import React, { useState } from "react";
// import axios from "axios";
import Pagination from "./Pagination/Pagiantion";
import "../../src/App.css";
import CharacterModal from "./Modals/CharacterModal";
// import { useQuery } from "@tanstack/react-query";
import FilterCharacters from "./SearchAndFilter/FilterCharacters";
import FilteringComponent from "./SearchAndFilter/FilteringComponent";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import { useCharacterData } from "../data-fetch/useCharacterData";
import { useHomeworldData } from "../data-fetch/useHomeworldData";
import { useSpeciesData } from "../data-fetch/useSpeciesData";

const Characters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const charactersPerPage = 10;

  const {
    isLoading: loadingCharacters,
    error: charactersError,
    data: characterData,
  } = useCharacterData(currentPage);

  const {
    isLoading: loadingHomeworlds,
    error: errorHomeworlds,
    data: homeworldData,
  } = useHomeworldData(characterData);

  const { data: speciesData } = useSpeciesData(characterData);

  if (loadingCharacters) return <LoadingSpinner />;
  if (charactersError)
    return "An error has occurred: " + charactersError.message;

  if (loadingHomeworlds) return <LoadingSpinner />;
  if (errorHomeworlds)
    return "An error has occurred: " + errorHomeworlds.message;

  const charactersWithHomeworlds = characterData.results.map((char, index) => {
    const characterWithHomeworld = {
      ...char,
      homeworld: homeworldData[index],
    };

    // Check if there's species data for this character
    if (speciesData && speciesData[index]) {
      characterWithHomeworld.species = speciesData[index];
    }

    return characterWithHomeworld;
  });

  const totalPages = Math.ceil(characterData?.count / charactersPerPage);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      <FilteringComponent
        searchQuery={searchQuery}
        filterType={filterType}
        filterValue={filterValue}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        onFilterTypeChange={(e) => setFilterType(e.target.value)}
        onFilterValueChange={(e) => setFilterValue(e.target.value)}
      />

      <FilterCharacters
        characters={charactersWithHomeworlds || []}
        filterType={filterType}
        filterValue={filterValue}
        searchQuery={searchQuery}
        onCardClick={handleCardClick}
      />

      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
      {selectedCharacter && (
        <CharacterModal onClose={() => setSelectedCharacter(null)}>
          <h2>{selectedCharacter.name}</h2>
          <p>Height: {selectedCharacter.height} meters</p>
          <p>Mass: {selectedCharacter.mass} kg</p>
          <p>Date Added: {selectedCharacter.created}</p>
          <p>Number of Films: {selectedCharacter.films.length}</p>
          <p>Birth Year: {selectedCharacter.birth_year}</p>
          <h3>Homeworld Information:</h3>
          <p>Name:{selectedCharacter.homeworld.name} </p>
          <p>Terrain:{selectedCharacter.homeworld.terrain} </p>
          <p>Climate:{selectedCharacter.homeworld.climate}</p>
          <p>Residents:{selectedCharacter.homeworld.residents?.length} </p>
        </CharacterModal>
      )}
    </div>
  );
};

export default Characters;
