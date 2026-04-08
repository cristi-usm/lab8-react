import { useFetch } from "../hooks/useFetch";

function DetaliiJoc({ id, inapoi }) {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const { date, loading, eroare } = useFetch(
    `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
  );

  if (loading) return <p>Loading...</p>;
  if (eroare) return <p>Eroare!</p>;
  if (!date) return <p>Nu exista date</p>;

  return (
    <div className="detalii">
  <button onClick={inapoi}>⬅ Inapoi</button>
  <h1>{date.name}</h1>
  {date.background_image && <img src={date.background_image} />}
  <p>{date.description_raw || "Fara descriere"}</p>
</div>
  );
}

export default DetaliiJoc;