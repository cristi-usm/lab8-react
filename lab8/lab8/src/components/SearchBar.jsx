import { useState } from "react";

export default function SearchBar({
  initialQuery,
  department,
  departments,
  onSearch,
  onDepartmentChange,
}) {
  const [input, setInput] = useState(initialQuery);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <section className="panel">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="search">Search artworks</label>
          <input
            id="search"
            type="text"
            placeholder="Try: monet, cat, landscape..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
          >
            {departments.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button className="btn" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}