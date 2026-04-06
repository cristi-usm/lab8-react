import "./NrDePagini.css";

function NrDePagini({ paginaCurenta, totalPagini, inapoi, inainte }) {
  return (
    <div className="parteaPaginare">
      <button
        className="btnPaginaAnterior"
        onClick={inapoi}
        disabled={paginaCurenta === 1}
      >
        Inapoi
      </button>

      <span className="textCuNrPagina">
        Pagina {paginaCurenta} din {totalPagini}
      </span>

      <button
        className="btnPaginaUrmator"
        onClick={inainte}
        disabled={paginaCurenta === totalPagini}
      >
        Inainte
      </button>
    </div>
  );
}
export default NrDePagini;
