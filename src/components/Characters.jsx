import React, { useState } from "react";
import axios from "axios";
import Pagination from "./Pagiantion";
import "../../src/App.css";
import CharacterModal from "./Modals/CharacterModal";
import { useQuery } from "@tanstack/react-query";
import FilterCharacters from "./searchAndFilter/FilterCharacters";
import FilteringComponent from "./searchAndFilter/FilteringComponent";

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
  } = useQuery(["characters", currentPage], () =>
    axios
      .get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((res) => res.data)
  );

  const {
    isLoading: loadingHomeworlds,
    error: errorHomeworlds,
    data: homeworldData,
  } = useQuery(
    ["homeworlds"],
    () => {
      if (characterData && characterData.results) {
        const characterPromises = characterData.results.map((char) =>
          axios.get(char.homeworld).then((res) => res.data)
        );

        return Promise.all(characterPromises);
      }
      return [];
    },
    {
      enabled: !!characterData, // Only fetch homeworldData if characterData is available
    }
  );
  const {
    // isLoading: loadingSpecies,
    // error: errorSpecies,
    data: speciesData,
  } = useQuery(
    ["species", characterData],
    () => {
      if (characterData && characterData.results) {
        const characterPromises = characterData.results.map((char) => {
          console.log(char.species[0]);
          if (char.species.length > 0) {
            return axios.get(char?.species[0]).then((res) => res.data);
          }
          // If no species, return an empty object
          return {};
        });
        return Promise.all(characterPromises);
      }
      return [];
    },
    {
      enabled: !!characterData, // Only fetch homeworldData if characterData is available
    }
  );

  if (loadingCharacters) return "Loading Characters...";
  if (charactersError)
    return "An error has occurred: " + charactersError.message;

  if (loadingHomeworlds) return "Loading Homeworlds...";
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
