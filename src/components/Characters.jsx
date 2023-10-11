import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagiantion";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const charactersPerPage = 10;

  const getData = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${currentPage}`
      );
      setData(response.data.results);
      setisLoading(false);
      setTotalPages(Math.ceil(response.data.count / charactersPerPage));
    } catch (err) {
      setError(err);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);
  console.log(totalPages, data);

  if (isloading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <ul>
        {data.map((character) => (
          <li key={character.name}>{character.name}</li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      ></Pagination>
    </div>
  );
};

export default Characters;
