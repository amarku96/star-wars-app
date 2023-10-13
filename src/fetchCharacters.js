const fetchPet = async ({ queryKey }) => {
  const currentPage = queryKey[1];
  const apiRes = await fetch(
    `https://swapi.dev/api/people/?page=${currentPage}`
  );

  if (!apiRes.ok) {
    throw new Error(`details/${currentPage} fetch not ok`);
  }

  return apiRes.json();
};

export default fetchPet;
