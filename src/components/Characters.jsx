import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagiantion";
import "../../src/App.css";
import CharacterModal from "./Modals/CharacterModal";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const charactersPerPage = 10;
  const getData = async (currentPage) => {
    try {
      const characterResponse = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPage}`
      );
      const characters = characterResponse.data.results;

      // Fetch the homeworld data for each character
      const characterPromises = characters.map(async (character) => {
        const homeworldResponse = await axios.get(character.homeworld);
        const homeworldData = homeworldResponse.data;
        return { ...character, homeworld: homeworldData };
      });

      // Wait for all homeworld requests to complete
      const charactersWithHomeworld = await Promise.all(characterPromises);

      setData(charactersWithHomeworld);
      setisLoading(false);
      setTotalPages(Math.ceil(characters.count / charactersPerPage));
    } catch (err) {
      setError(err);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  console.log("selectedCharacter", data);
  if (isloading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>

      <div class="grid-container">
        {data.map((character) => (
          <div
            key={character.name}
            class="grid-item"
            onClick={() => handleCardClick(character)}
          >
            {character.name}
          </div>
        ))}
      </div>
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
