function CardJoc({ joc, onSelect, toggle, esteFavorit }) {
  return (
    <div className="card" onClick={() => onSelect(joc.id)}>
  <img src={joc.background_image} alt={joc.name} />
  <h3>{joc.name}</h3>
  <p>Rating: {joc.rating}</p>
  <button
    onClick={e => {
      e.stopPropagation();
      toggle(joc);
    }}
  >
    {esteFavorit(joc.id) ? "❤️" : "🤍"}
  </button>
</div>
  );
}

export default CardJoc