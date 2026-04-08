export default function SearchBar({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search NASA images..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border p-2 w-full mb-4"
    />
  );
}