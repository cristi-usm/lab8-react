export default function Pagination({ page, setPage }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      <button disabled={page===1} onClick={() => setPage(page-1)}>Prev</button>
      <span>Page {page}</span>
      <button onClick={() => setPage(page+1)}>Next</button>
    </div>
  );
}