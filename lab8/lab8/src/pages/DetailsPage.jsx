import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { buildDetailsUrl } from "../api/artic";
import useFetch from "../hooks/useFetch";
import useFavorites from "../hooks/useFavorites";
import { getArtworkImageUrl } from "../utils/image";
import StatusBox from "../components/StatusBox";

export default function DetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const detailsUrl = buildDetailsUrl(id);
  const { data, loading, error } = useFetch(detailsUrl, {
    ttl: 1000 * 60 * 10,
  });

  const artwork = data?.data;

  function goBack() {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  }

  if (loading) {
    return <StatusBox type="info" text="Loading artwork details..." />;
  }

  if (error) {
    return <StatusBox type="error" text={`Error: ${error}`} />;
  }

  if (!artwork) {
    return <StatusBox type="warning" text="Artwork details not found." />;
  }

  const favoritePayload = {
    id: artwork.id,
    title: artwork.title,
    artist_title: artwork.artist_title,
    image_id: artwork.image_id,
    date_display: artwork.date_display,
    department_title: artwork.department_title,
  };

  return (
    <section className="details">
      <div className="details-actions">
        <button className="btn" onClick={goBack}>
          Back to list
        </button>

        <button
          className={isFavorite(artwork.id) ? "btn favorite-action active" : "btn favorite-action"}
          onClick={() => toggleFavorite(favoritePayload)}
        >
          {isFavorite(artwork.id) ? "Remove favorite" : "Add to favorites"}
        </button>
      </div>

      <div className="details-layout">
        <div className="details-image-box">
          <img
            className="details-image"
            src={getArtworkImageUrl(artwork.image_id, 843)}
            alt={artwork.title}
          />
        </div>

        <div className="details-content">
          <h1>{artwork.title || "Untitled"}</h1>
          <p className="muted">{artwork.artist_title || "Unknown artist"}</p>

          <div className="details-meta">
            <p><strong>Date:</strong> {artwork.date_display || "N/A"}</p>
            <p><strong>Department:</strong> {artwork.department_title || "N/A"}</p>
            <p><strong>Type:</strong> {artwork.artwork_type_title || "N/A"}</p>
            <p><strong>Style:</strong> {artwork.style_title || "N/A"}</p>
            <p><strong>Classification:</strong> {artwork.classification_title || "N/A"}</p>
            <p><strong>Origin:</strong> {artwork.place_of_origin || "N/A"}</p>
            <p><strong>Medium:</strong> {artwork.medium_display || "N/A"}</p>
            <p><strong>Dimensions:</strong> {artwork.dimensions || "N/A"}</p>
            <p><strong>Reference number:</strong> {artwork.main_reference_number || "N/A"}</p>
            <p><strong>Public domain:</strong> {artwork.is_public_domain ? "Yes" : "No"}</p>
          </div>

          {artwork.artist_display && (
            <div className="details-section">
              <h2>Artist display</h2>
              <p>{artwork.artist_display}</p>
            </div>
          )}

          {artwork.short_description && (
            <div className="details-section">
              <h2>Description</h2>
              <div
                dangerouslySetInnerHTML={{ __html: artwork.short_description }}
              />
            </div>
          )}

          {artwork.credit_line && (
            <div className="details-section">
              <h2>Credit line</h2>
              <p>{artwork.credit_line}</p>
            </div>
          )}

          {artwork.exhibition_history && (
            <div className="details-section">
              <h2>Exhibition history</h2>
              <p>{artwork.exhibition_history}</p>
            </div>
          )}

          {artwork.publication_history && (
            <div className="details-section">
              <h2>Publication history</h2>
              <p>{artwork.publication_history}</p>
            </div>
          )}

          {artwork.provenance_text && (
            <div className="details-section">
              <h2>Provenance</h2>
              <p>{artwork.provenance_text}</p>
            </div>
          )}

          <Link className="btn secondary" to="/favorites">
            Open favorites
          </Link>
        </div>
      </div>
    </section>
  );
}