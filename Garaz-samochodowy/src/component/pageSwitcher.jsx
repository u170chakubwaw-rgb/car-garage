// Przyciski stron: < Previous  1  2  3  Next >
// Komponent nie wie nic o autach – dostaje tylko numer strony i liczbę stron.
export default function PageSwitcher({ currentPage, totalPages, onPageChange }) {
  // robimy listę numerów stron, np. [1, 2, 3]
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((number) => {
        // aktualna strona dostaje dodatkową klasę "active" (niebieskie tło)
        let className;
        if (number === currentPage) {
          className = "page-btn active";
        } else {
          className = "page-btn";
        }

        return (
          <button key={number} className={className} onClick={() => onPageChange(number)}>
            {number}
          </button>
        );
      })}

      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
