import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useHomeworldData(characterData) {
  return useQuery(
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
      enabled: !!characterData,
    }
  );
}
