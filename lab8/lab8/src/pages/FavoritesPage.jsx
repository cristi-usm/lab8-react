import useFavorites from "../hooks/useFavorites";
import ArtworkCard from "../components/ArtworkCard";
import StatusBox from "../components/StatusBox";

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="page-stack">
      <section className="hero small-hero">
        <h1>Favorites</h1>
        <p>Your saved artworks are stored in localStorage.</p>
      </section>

      {favorites.length === 0 ? (
        <StatusBox type="info" text="You have no favorites yet." />
      ) : (
        <section className="grid">
          {favorites.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isFavorite={isFavorite(artwork.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}