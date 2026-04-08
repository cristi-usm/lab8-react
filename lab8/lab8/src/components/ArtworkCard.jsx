import { Link, useLocation } from "react-router-dom";
import { getArtworkImageUrl } from "../utils/image";

export default function ArtworkCard({ artwork, isFavorite, onToggleFavorite }) {
  const location = useLocation();

  const favoritePayload = {
    id: artwork.id,
    title: artwork.title,
    artist_title: artwork.artist_title,
    image_id: artwork.image_id,
    date_display: artwork.date_display,
    department_title: artwork.department_title,
  };

  return (
    <article className="card">
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={getArtworkImageUrl(artwork.image_id, 400)}
          alt={artwork.title}
          loading="lazy"
        />
        <button
          className={isFavorite ? "favorite-btn favorite" : "favorite-btn"}
          onClick={() => onToggleFavorite(favoritePayload)}
          type="button"
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="card-body">
        <h3 className="card-title">{artwork.title || "Untitled"}</h3>
        <p className="muted">{artwork.artist_title || "Unknown artist"}</p>
        <p className="muted small">{artwork.department_title || "No department"}</p>
        <p className="card-text">{artwork.short_description || artwork.date_display || "No short description available."}</p>

        <Link
          className="btn secondary"
          to={`/artwork/${artwork.id}`}
          state={{ from: location }}
        >
          View details
        </Link>
      </div>
    </article>
  );
}