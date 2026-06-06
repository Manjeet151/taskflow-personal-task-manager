function TaskFilters({ currentFilter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="task-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${
            currentFilter === filter ? "active" : ""
          }`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;