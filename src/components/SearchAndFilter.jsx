import React from "react";

const SearchAndFilter = ({
  onSearch,
  onFilterChange,
  filterType,
  filterValue,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search by character name..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <select
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Homeworld">Homeworld</option>
        <option value="Film">Film</option>
        <option value="Species">Species</option>
      </select>
      <input
        type="text"
        placeholder={`Filter by ${filterType.toLowerCase()}...`}
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default SearchAndFilter;
