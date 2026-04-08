export default function CountryCard({ country,  onToggle, isSaved }) {
  return (
    <div className="card">
      <img src={country.flags?.png} alt="flag" />

      <h3>{country.name?.common}</h3>
      <p>Capital: {country.capital?.[0] || "N/A"}</p>

    
      <button
        onClick={(e) => {
          e.stopPropagation(); // IMPORTANT
          onToggle();
        }}
      >
        {isSaved ? "Șterge din destinații" : "Adaugă la destinații"}
      </button>
    </div>
  );
}