import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { buildSearchUrl, DEPARTMENTS } from "../api/artic";
import useFetch from "../hooks/useFetch";
import useFavorites from "../hooks/useFavorites";
import SearchBar from "../components/SearchBar";
import ArtworkCard from "../components/ArtworkCard";
import Pagination from "../components/Pagination";
import StatusBox from "../components/StatusBox";

const LIMIT = 12;

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const query = searchParams.get("q") || "";
  const department = searchParams.get("department") || "";
  const page = Number(searchParams.get("page") || 1);

  const searchUrl = useMemo(() => {
    return buildSearchUrl({
      query,
      department,
      page,
      limit: LIMIT,
    });
  }, [query, department, page]);

  const { data, loading, error } = useFetch(searchUrl, {
    ttl: 1000 * 60 * 5,
  });

  const artworks = data?.data || [];
  const pagination = data?.pagination || {};
  const totalPages = pagination.total_pages || 1;
  const totalItems = pagination.total || 0;

  function updateParams(next) {
    const merged = {
      q: query,
      department,
      page: String(page),
      ...next,
    };

    if (!merged.q) delete merged.q;
    if (!merged.department) delete merged.department;

    setSearchParams(merged);
  }

  function handleSearch(nextQuery) {
    updateParams({
      q: nextQuery.trim(),
      page: "1",
    });
  }

  function handleDepartmentChange(nextDepartment) {
    updateParams({
      department: nextDepartment,
      page: "1",
    });
  }

  function goPrev() {
    if (page > 1) {
      updateParams({ page: String(page - 1) });
    }
  }

  function goNext() {
    if (page < totalPages) {
      updateParams({ page: String(page + 1) });
    }
  }

  return (
    <div className="page-stack">
      <section className="hero">
        <h1>Art Explorer</h1>
        <p>
          Search artworks, filter by department, open details, and save favorites.
        </p>
      </section>

      <SearchBar
        initialQuery={query}
        department={department}
        departments={DEPARTMENTS}
        onSearch={handleSearch}
        onDepartmentChange={handleDepartmentChange}
      />

      {!query && !department && !loading && !error && artworks.length === 0 && (
        <StatusBox
          type="info"
          text="Welcome! Enter a search term or choose a department to start exploring."
        />
      )}

      {loading && <StatusBox type="info" text="Loading artworks..." />}

      {error && <StatusBox type="error" text={`Error: ${error}`} />}

      {!loading && !error && artworks.length === 0 && (query || department) && (
        <StatusBox type="warning" text="No results found for the current search and filter." />
      )}

      {!loading && !error && artworks.length > 0 && (
        <>
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            onPrev={goPrev}
            onNext={goNext}
          />

          <section className="grid">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                isFavorite={isFavorite(artwork.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}