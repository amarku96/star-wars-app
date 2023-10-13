import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCharacterData(currentPage) {
  return useQuery(["characters", currentPage], () =>
    axios
      .get(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((res) => res.data)
  );
}
