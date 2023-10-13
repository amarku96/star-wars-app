import React from "react";
import "./FilteringStyle.css";

function FilteringComponent({
  searchQuery,
  filterType,
  filterValue,
  onSearchChange,
  onFilterTypeChange,
  onFilterValueChange,
}) {
  return (
    <div className="filter-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by character name..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
      <div className="filter-options">
        <select value={filterType} onChange={onFilterTypeChange}>
          <option value="name">Name</option>
          <option value="homeworld">Homeworld</option>
          {/* <option value="film">Film</option> */}
          <option value="species">Species</option>
        </select>
        <input
          type="text"
          placeholder="Enter filter value..."
          value={filterValue}
          onChange={onFilterValueChange}
        />
      </div>
    </div>
  );
}

export default FilteringComponent;
