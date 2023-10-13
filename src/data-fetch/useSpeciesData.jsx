import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSpeciesData(characterData) {
  return useQuery(
    ["species", characterData],
    () => {
      if (characterData && characterData.results) {
        const characterPromises = characterData.results.map((char) => {
          if (char.species.length > 0) {
            return axios.get(char?.species[0]).then((res) => res.data);
          }
          return {};
        });
        return Promise.all(characterPromises);
      }
      return [];
    },
    {
      enabled: !!characterData,
    }
  );
}
