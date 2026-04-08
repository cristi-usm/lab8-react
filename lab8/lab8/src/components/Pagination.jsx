export default function Pagination({
  page,
  totalPages,
  totalItems,
  onPrev,
  onNext,
}) {
  return (
    <div className="pagination">
      <button className="btn" onClick={onPrev} disabled={page <= 1}>
        Prev
      </button>

      <div className="pagination-info">
        <span>Page: {page}</span>
        <span>Total pages: {totalPages || 1}</span>
        <span>Total results: {totalItems || 0}</span>
      </div>

      <button className="btn" onClick={onNext} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
}