import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useDestination from "../hooks/useDestination";
import CountryCard from "./CountryCard";

function Countries() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("search");

  const countriesPerPage = 12;
  const { data: countries, loading, error } = useFetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,region"
  );


  const { destinations, toggleDestination } = useDestination();


  const filteredCountries = countries.filter((country) => {
    const text = search.toLowerCase();

    const nameMatch = country.name?.common
      ?.toLowerCase()
      .includes(text);

    const capitalMatch = country.capital?.[0]
      ?.toLowerCase()
      .includes(text);

    return (
      (nameMatch || capitalMatch) &&
      (region === "" || country.region === region)
    );
  });


  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;

  const currentCountries = filteredCountries.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(
    filteredCountries.length / countriesPerPage
  );


  if (loading) return <p>Se încarcă...</p>;
  if (error) return <p>Eroare la încărcare</p>;

  return (
    <div className="container">
      <h1>Lista Țărilor</h1>


      <div>
        <button onClick={() => setView("search")}>
          SEARCH
        </button>

        <button onClick={() => setView("destinations")}>
          DESTINAȚII ({destinations.length})
        </button>
      </div>


      {view === "search" && (
        <>
          <input
            type="text"
            placeholder="Caută..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Toate regiunile</option>
            <option value="Europe">Europa</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Oceania">Oceania</option>
          </select>

          <p>
            Pagina: {currentPage} / {totalPages}
          </p>

          <div className="grid">
            {currentCountries.map((country, index) => (
              <CountryCard
                key={index}
                country={country}
                onToggle={() => toggleDestination(country)}
                isSaved={destinations.some(
                  (item) => item.name.common === country.name.common
                )}
              />
            ))}
          </div>

          <div className="pagination-wrapper">
            <button
              className="prev-button"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            <button
              className="next-button"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>

          {filteredCountries.length === 0 && <p>Nu există rezultate</p>}
        </>
      )}


      {view === "destinations" && (
        <>
          <h2>Destinații de vizitat</h2>

          {destinations.length === 0 && <p>Nu ai nimic salvat</p>}

          <div className="grid">
            {destinations.map((country, index) => (
              <CountryCard
                key={index}
                country={country}
                onToggle={() => toggleDestination(country)}
                isSaved={true}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Countries;